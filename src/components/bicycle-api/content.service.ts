import NotionService from "../notion-api/notion.service";
import NotionFormatterService from "./format-adapter.service";
import { BadRequestException, ConflictException, NotFoundException } from "../next-api-utils/exceptions";

/*
	Provides data from Expected (Bicycle Share Template) notion templated page
	also provides database interfaces for building queries or retrieving data
*/

export type ServiceConfig = {
	TERMS_CONDITIONS: string | undefined;
	BICYCLES: string | undefined;
	TIMESTAMPS: string | undefined;
	SIGNED_USERS_DATABASE: string | undefined;
	// HOW_TO_USE: string | undefined;
	// DEV: string | undefined;
}

type ValidatedServiceConfig = {
	TERMS_CONDITIONS: string;
	BICYCLES: string;
	TIMESTAMPS: string;
	SIGNED_USERS_DATABASE: string;
	// HOW_TO_USE: string | undefined;
	// DEV: string | undefined;
};

export default class BicycleShareContentService {
	private config: ValidatedServiceConfig;
	constructor(
		private notionContentService: NotionFormatterService,
		config: ServiceConfig,
	) {
		if (Object.values(config).some(value => value === undefined)) {
			throw new Error('All config values must be defined');
		}
	  
		this.config = config as ValidatedServiceConfig;
	}

	async getTermsAndConditions() {
		return await this.getContent(
			// this.config.TERMS_CONDITIONS ||
			this.config.TERMS_CONDITIONS
		);
	}


	async getBicycles(): Promise<BicycleInfo[] | null> {
		const database = await this.notionContentService.getDatabaseContent(this.config.BICYCLES);
		try {
			const properties = await database.getPropertiesList();
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
		} catch (error: any) {
			return null;
		}
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
		const properties = await database.getPropertiesList();
		if (!properties.length) {
			throw new NotFoundException("No bicycle found");
		}
		const bicycleData = properties[0];
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
	private config: ValidatedServiceConfig;
	constructor(
		private notionContentService: NotionFormatterService,
		config: ServiceConfig
	) {
		if (Object.values(config).some(value => value === undefined)) {
			throw new Error('All config values must be defined');
		}
	  
		this.config = config as ValidatedServiceConfig;
	}

	async getUserByIntraID(userID: number): Promise<User | null> {
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.SIGNED_USERS_DATABASE,
		);
		query.addFilter("IntraID", "number", "equals", userID);
		const database = await query.execute();
		const items = await database.getPropertiesList();
		if (!items.length) {
			console.log("No user found");
			return null;
		}
		const userData = items[0];
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
		private config: ValidatedServiceConfig,
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
			this.config.SIGNED_USERS_DATABASE
		);
		query.addFilter("IntraID", "number", "equals", this.user.id);
		const database = await query.execute();
		const itemsFound = await database.getPropertiesList();
		return itemsFound.length > 0;
	}
}

type BicycleData = {
	id: string;
	lockerId: number;
	name: string;
	available: boolean;
	disabledReason: string;
}

type Use = {
	id: string;
	name: string;
	fullName: string;
	image: {url:string};
	start: number;
	end: number;
}

export class BicycleInfo {
	constructor(
		public data: any,
		private notionContentService: NotionFormatterService,
		private config: ValidatedServiceConfig,
	) {
	}

	async getLastUse(): Promise<Use | null>
	{
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.TIMESTAMPS,
		);
		query.and().addFilter("Bicycles", "relation", "contains", this.data.id);
		query.addSort("Share Started (UNIX)", "descending");
		const database = await query.execute();
		const properties = await database.getPropertiesList();
		if (!properties.length) {
			return null;
		}
		const lastTimestamp = properties[0];
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
			start: lastTimestamp["Share Started (UNIX)"]?.number,
			end: lastTimestamp["Share Ended (UNIX)"]?.number,
		}
	}

	getName(): string {
		return (this.data.Name.title[0].plain_text);
	}

	async getLastUses(index: number): Promise<Use[]> {
		const query = this.notionContentService.getDatabaseQueryBuilder(
			this.config.TIMESTAMPS
		);
		query.and().addFilter("Bicycles", "relation", "contains", this.data.id);
		query.addSort("Share Started (UNIX)", "descending");
		const database = await query.execute();
		const properties = await database.getPropertiesList();
		if (!properties.length) {
			return [];
		}
		const lastTimestamps = properties.slice(index, index + 5);
		const uses = await lastTimestamps.map(async (timestamp: any, index: number) => {
			const lastUser  = timestamp?.Holder.relation[0]?.id;
			const userData = await this.notionContentService.getPage(lastUser);
			const user = userData.page.properties;
			const startDate = new Date(timestamp["Share Started (UNIX)"].number);
			const endDate = new Date(timestamp["Returned On (UNIX)"].number);
			const options: Intl.DateTimeFormatOptions = { 
				year: 'numeric', 
				month: 'short', 
				day: 'numeric', 
				hour: '2-digit', 
				minute: '2-digit', 
				timeZone: 'Europe/Berlin' 
			};
			if (!user.IntraID) return null;
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

	//**  because 
	async getImageLink(): Promise<string> {
		return this.notionContentService.getPageContent(this.data.id).then((page: any) => {
		  const image = page.results[0].image.file.url;
		  return image;
		});
	}

}