import NotionService from "../notion-api/notion.service";
import NotionFormatterService from "./format-adapter.service";
import { BadRequestException, ConflictException, NotFoundException } from "../next-api-utils/exceptions";

/*
	Provides data from Expected (Bicycle Share Template) notion templated page
	also provides database interfaces for building queries or retrieving data
*/

enum Content {
	TERMS_CONDITIONS = "terms-and-conditions",
	HOW_TO_USE = "how-to-use",
	BICYCLES = "bicycles",
	TIMESTAMPS = "timestamps",
	DEV = "dev",
}

type ServiceConfig = {
	[key in Content]: string;
}

export default class BicycleShareContentService {
	constructor(
		private notionContentService: NotionFormatterService,
		private config: ServiceConfig,
	) {
	}

	async map(content: string): Promise<any> {
		switch (content) {
			case Content.TERMS_CONDITIONS:
				// return this.getRootPage();
				return this.getTermsAndConditions();
			case Content.HOW_TO_USE:
				return this.getHowToUse();
			case Content.BICYCLES:
				return this.getBicycles();
			case Content.TIMESTAMPS:
				return this.getTimeStamps();
			case Content.DEV:
			default:
				return "No content found";
		}
	}

	async getTermsAndConditions() {
		return await this.getContent(
			// this.config[Content.TERMS_CONDITIONS] ||
			this.config.TERMS_CONDITIONS
		);
	}

	async getHowToUse() {
		return await this.getContent(
			this.config.HOW_TO_USE
		);
	}

	async getBicycles(): Promise<BicycleInfo[]> {
		// function delay(ms) {
		// 	return new Promise(resolve => setTimeout(resolve, ms));
		// }
		// await delay(3000);
		const database = await this.notionContentService.getDatabaseContent(this.config.BICYCLES);
		const properties = database.getPropertiesList();
		return properties.map((property: any) => {
			const properties: BicycleData = {
				id: property.id,
				available: property.Availability.select.name === "Available",
				disabledReason: property["Disabled Reason"].rich_text[0],
				name: property.Name.title[0].plain_text,
				lockerId: property.Locker.number,
			}
			return new BicycleInfo(properties, this.notionContentService, this.config);
		});
	}


	async getRootPage() {
		return await this.getContent(process.env.ROOT_PAGE_ID);
	}

	private async getContent(id?: string): Promise<any> {
		if (!id) throw new NotFoundException("No page found");
		return this.notionContentService.getPageContent(id);
	}

	async getBicycleInterface(id: number): Promise<BicycleInfo | null> {
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.BICYCLES,
		);
		query.addFilter("Locker", "number", "equals", id);
		const database = await query.execute();
		if (!database.getPropertiesList().length) {
			return null;
		}
		const bicycleData = database.getPropertiesList()[0];
		return new BicycleInfo(bicycleData, this.notionContentService, this.config);
	}
}

type User = {
	id: number;
	name: string;
	fullName: string;
	image: string;
}

type TokenUser = {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	image: {
		link: string;
		versions: {
			large: string;
			medium: string;
			small: string;
			micro: string;
		}
	}
}

export class UserService {
	constructor(
		private notionContentService: NotionFormatterService,
		private config: ServiceConfig,
	) {}

	async getUserByIntraID(userID: number): Promise<User | null> {
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.SIGNED_USERS_DATABASE,
		);
		query.addFilter("IntraID", "number", "equals", userID);
		const database = await query.execute();
		if (!database.getPropertiesList().length) {
			return null;
		}
		const userData = database.getPropertiesList()[0];
		return {
			id: userData.IntraID.number,
			name: userData.Name.rich_text[0].plain_text,
			fullName: userData.IntraName.title[0].plain_text,
			image: userData.ProfileImage.url,
		}
	}

	public getUserInterface(user: TokenUser
	): UserInterface {
		return new UserInterface({
				id: user.id,
				name: user.login,
				fullName: `${user.first_name} ${user.last_name}`,
				image: user.image.link,
			},
			this.notionContentService,
			this.config
		);
	}
}

class UserInterface {
	constructor(
		private user: User,
		private notionContentService: NotionFormatterService,
		private config: ServiceConfig,
	) {}

	async acceptTermsAndConditions(): Promise<any> {
		if (await this.exists()) {
			return {message: "User already exists", status: 400};
		}
		const response = await this.RegisterUser();
		return {message: "User registered", status: 200};
	}

	private async RegisterUser(): Promise<any> {
		const newEntry = this.notionContentService.getDatabaseEntryBuilder(
			this.config.SIGNED_USERS_DATABASE
		);
		newEntry.addTitle("IntraName", this.user.name);
		newEntry.addRichText("Name", this.user.fullName);
		newEntry.addUrl("ProfileImage", this.user.image);
		newEntry.addNumber("IntraID", this.user.id);
		const response = await newEntry.postEntry();
		return response;
	}

	private async exists(): Promise<boolean> {
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.SIGNED_USERS_DATABASE,
		);
		query.addFilter("IntraID", "number", "equals", this.user.id);
		const database = await query.execute();
		const itemsFound = database.getPropertiesList();
		return itemsFound.length > 0;
	}
}

type BicycleData = {
	id: string;
	lockerId: number;
	name: string;
	disabledReason: string;
}

type Use = {
	id: string;
	name: string;
	fullName: string;
	image: string;
	start: any;
	end: any;
}

export class BicycleInfo {
	constructor(
		public data: BicycleData,
		private notionContentService: NotionFormatterService,
		private config: ServiceConfig,
	) {}

	async getLastUse(): Promise<Use | null>
	{
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.TIMESTAMPS,
		);
		query.and().addFilter("Bicycles", "relation", "contains", this.data.id);
		query.addSort("Share Started (UNIX)", "descending");
		const database = await query.execute();
		if (!database.getPropertiesList().length) {
			return null;
		}
		const lastTimestamp = database.getPropertiesList()[0];
		const lastUser = lastTimestamp.Holder.relation[0]?.id;
		if (!lastUser) {
			return null;
		}
		const userData = await this.notionContentService.getPage(lastUser);
		return {
			id: userData.page.properties.IntraID.number,
			name: userData.page.properties.IntraName.title[0].plain_text,
			fullName: userData.page.properties.Name.rich_text[0].plain_text,
			image: userData.page.properties.ProfileImage,
			start: lastTimestamp["Share Started (UNIX)"],
			end: lastTimestamp["Share Ended (UNIX)"],
		}
	}

	async getLastUses(): Promise<Use[] | null> {
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.TIMESTAMPS,
		);
		query.and().addFilter("Bicycles", "relation", "contains", this.data.id);
		query.addSort("Share Started (UNIX)", "descending");
		const database = await query.execute();
		if (!database.getPropertiesList().length) {
			return null;
		}
		const lastTimestamps = database.getPropertiesList();
		const uses = await lastTimestamps.map(async (timestamp, index) => {
			const lastUser  = timestamp?.Holder.relation[0]?.id;
			const userData = await this.notionContentService.getPage(lastUser);
			const user = userData.page.properties;
			const startDate = new Date(timestamp["Share Started (UNIX)"].number);
			const endDate = new Date(timestamp["Returned On (UNIX)"].number);
			const options = { 
				year: 'numeric', 
				month: 'short', 
				day: 'numeric', 
				hour: '2-digit', 
				minute: '2-digit', 
				timeZone: 'Europe/Berlin' 
			};			
			return {
				id: user.IntraID.number,
				fullName: user.Name.rich_text[0].plain_text,
				name: user.IntraName.title[0].plain_text,
				image: user.ProfileImage.url,
				start: startDate.toLocaleString('de-DE', options),
				startUnix: timestamp["Share Started (UNIX)"].number,
				end: endDate.toLocaleString('de-DE', options),
				endUnix: timestamp["Returned On (UNIX)"].number,
			}
		});
		return uses;
	}

	async getLastTimestamps(): Promise<Timestamp[] | null> {

	}

	async getImageLink(): Promise<string> {
		return this.notionContentService.getPageContent(this.data.id).then((page: any) => {
		  const image = page.results[0].image.file.url;
		  return image;
		});
	}

}