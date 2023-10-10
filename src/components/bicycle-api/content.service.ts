import NotionFormatterService from "./format-adapter.service";
import { NotionDatabaseTool } from "@edvinas1122/notion-database-tool";
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
		private databaseTool: NotionDatabaseTool,
		config: ServiceConfig,
	) {
		if (Object.values(config).some(value => value === undefined)) {
			throw new Error('All config values must be defined');
		}
	  
		this.config = config as ValidatedServiceConfig;
	}

	async getTermsAndConditions() {
		return await this.notionContentService.getPageContent(
			// this.config.TERMS_CONDITIONS ||
			this.config.TERMS_CONDITIONS
		);
	}

	async registerBicycleBorrow(
		userId: number,
		bicycleId: number,
		duration: string,
	) {
		const unixTimestamp = new Date().getTime();
		const bicycle_entry_id = await this.databaseTool
			.getTable("Bicycles")
			.getEntries("equals")
			.byKey(bicycleId)
			.then((entry: any) => entry.id());
		const user_entry_id = await this.databaseTool
			.getTable("SignedUp")
			.getEntries("equals")
			.byIntraID(userId)
			.then((entry: any) => entry.id());
		const response = await this.databaseTool
			.getTable("Share Timestamps")
			.newEntrySlot()
			.insert({
				Holder: [user_entry_id],
				Bicycles: [bicycle_entry_id],
				"Share Started (UNIX)": unixTimestamp,
				"Returned On (UNIX)": 0,
				"Intended Duration": duration,
			})
		return response;
	}

	async getBicycles(): Promise<BicycleInfo[] | null> {
		const properties = await this.databaseTool
			.getTable("Bicycles")
			.getEntries()
			.all()
			.then((entries: any) => entries.all());

		const bicycles = properties.map((property: any) => {
			// const properties: BicycleData = {
			// 	id: property["id"],
			// 	available: property["Availability"],
			// 	disabledReason: property["Disabled Reason"],
			// 	name: property["Name"],
			// 	lockerId: property["Locker"],
			// }
			return new BicycleInfo(
				property,
				this.databaseTool,
				);
		});
		return bicycles;
		// console.log("gete---->", await properties);
		// const database = await this.notionContentService.getDatabaseContent(this.config.BICYCLES);
		// try {
		// 	const properties = await database.getPropertiesList();
		// 	return properties.map((property: any) => {
		// 		const properties: BicycleData = {
		// 			id: property.id,
		// 			available: property.Availability.select.name === "Available",
		// 			disabledReason: property["Disabled Reason"].rich_text[0],
		// 			name: property.Name.title[0].plain_text,
		// 			lockerId: property.Locker.number,
		// 		}
		// 		return new BicycleInfo(properties, this.notionContentService, this.config);
		// 	});
		// } catch (error: any) {
		// 	return null;
		// }
	}


	async getRootPage() {
		return await this.getContent(process.env.ROOT_PAGE_ID);
	}

	private async getContent(id?: string): Promise<any> {
		if (!id) throw new NotFoundException("No page found");
		return this.notionContentService.getPageContent(id);
	}

	async getBicycleInterface(id: number): Promise<BicycleInfo | null> {
		const properties = await this.databaseTool
			.getTable("Bicycles")
			.getEntries()
			.byLocker(id)
			.then((entry: any) => entry.all());
		// console.log("gete---->", await properties);
		if (!properties.length) {
			throw new NotFoundException("No bicycle found");
		}
		const bicycleData = await properties[0];
		return new BicycleInfo(
			bicycleData,
			this.databaseTool,
		);
		// const query = this.notionContentService.getDatabaseQueryBuilder(
		// 	this.config.BICYCLES,
		// );
		// query.addFilter("Locker", "number", "equals", id);
		// const database = await query.execute();
		// const properties = await database.getPropertiesList();
		// if (!properties.length) {
		// 	throw new NotFoundException("No bicycle found");
		// }
		// const bicycleData = properties[0];
		// return new BicycleInfo(
		// 	bicycleData,
		// 	this.notionContentService,
		// 	this.config,
		// 	this.databaseTool,
		// );
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
	// private config: ValidatedServiceConfig;
	constructor(
		// private notionContentService: NotionFormatterService,
		// config: ServiceConfig,
		private databaseTool: NotionDatabaseTool,
	) {
		// if (Object.values(config).some(value => value === undefined)) {
		// 	throw new Error('All config values must be defined');
		// }
	  
		// this.config = config as ValidatedServiceConfig;
	}

	async getUserByIntraID(userID: number): Promise<User | null> {
		const properties = await this.databaseTool
			.getTable("SignedUp")
			.getEntries()
			.byIntraID(userID)
			.then((entry: any) => entry.all());

		if (!properties.length) {
			console.log("No user found");
			return null;
		}
		const userData = await properties[0];
		return {
			id: userData.IntraID,
			name: userData.Name,
			fullName: userData.IntraName,
			image: userData.ProfileImage,
		}

		// const query = this.notionContentService.getDatabaseQueryBuilder(
		// 	this.config.SIGNED_USERS_DATABASE,
		// );
		// query.addFilter("IntraID", "number", "equals", userID);
		// const database = await query.execute();
		// const items = await database.getPropertiesList();
		// if (!items.length) {
		// 	console.log("No user found");
		// 	return null;
		// }
		// const userData = items[0];
		// return {
		// 	id: userData.IntraID.number,
		// 	name: userData.Name.rich_text[0].plain_text,
		// 	fullName: userData.IntraName.title[0].plain_text,
		// 	image: userData.ProfileImage.url,
		// }
	}

	public getUserInterface(user: TokenUser
	): UserInterface {
		return new UserInterface({
				id: user.id,
				name: user.login,
				fullName: `${user.first_name} ${user.last_name}`,
				image: user.image.link,
			},
			this.databaseTool,
		);
	}
}

class UserInterface {
	constructor(
		private user: User,
		private databaseTool: NotionDatabaseTool,
	) {}

	/*
		Entry insetion into a table with protection against duplicates
	*/
	async acceptTermsAndConditions(): Promise<any> {
		if (await this.exists()) {
			return {message: "User already exists", status: 400};
		}
		const response = await this.RegisterUser();
		return {message: "User registered", status: 200};
	}

	/*
		Insertion method
	*/
	private async RegisterUser(): Promise<any> {
		console.log("teggew--<",this.user.image)
		const slot = await this.databaseTool
			.getTable("SignedUp")
			.newEntrySlot()
			.insert({
				"IntraName": this.user.name,
				"Name": this.user.fullName,
				"ProfileImage": this.user.image,
				"IntraID": this.user.id,
			});
		return slot;

		// const newEntry = this.notionContentService.getDatabaseEntryBuilder(
		// 	this.config.SIGNED_USERS_DATABASE
		// );
		// newEntry.addTitle("IntraName", this.user.name);
		// newEntry.addRichText("Name", this.user.fullName);
		// newEntry.addUrl("ProfileImage", this.user.image);
		// newEntry.addNumber("IntraID", this.user.id);
		// const response = await newEntry.postEntry();
		// return response;
	}

	/*
		Checks if the user already exists in the database
	*/
	private async exists(): Promise<boolean> {
		const query = await this.databaseTool
			.getTable("SignedUp")
			.getEntries()
			.byIntraID(this.user.id)
			.then((entry: any) => entry.all());

		return query.length > 0;

		// const query = this.notionContentService.getDatabaseQueryBuilder(
		// 	this.config.SIGNED_USERS_DATABASE
		// );
		// query.addFilter("IntraID", "number", "equals", this.user.id);
		// const database = await query.execute();
		// const itemsFound = await database.getPropertiesList();
		// return itemsFound.length > 0;
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
	image: {url: string};
	start: number;
	end: number;
}


/*
	Table Entry
*/
export class BicycleInfo {
	constructor(
		private data: any,
		private databaseTool: NotionDatabaseTool,
	) {
	}

	/*
		Relationally extract other table entry
	*/
	async getLastUse(): Promise<Use | null>
	{
		const test = await this.databaseTool
			.getTable("Share Timestamps")
			.query()
			.filter("Bicycles", "relation", "contains", this.data.id)
			.sort("Share Started (UNIX)", "descending")
			.get()
			.then((entries: any) => entries.all());
		if (!test.length) {
			// console.log("No user found");
			return null;
		}
		const last_user = await test[0]["Holder"][0];
		const user = await last_user();
		// console.log("fewfewew----<<<",user);
		return {
			id: user["IntraID"],
			name: user["Name"],
			fullName: user["IntraName"],
			start: test[0]["Share Started (UNIX)"],
			end: test[0]["Share Ended (UNIX)"],
			image: {url: user.ProfileImage},
		}
		// console.log(test);

		// const query = this.notionContentService.getDatabaseQueryBuilder(
		// 	this.config.TIMESTAMPS,
		// );
		// query.and().addFilter("Bicycles", "relation", "contains", this.data.id);
		// query.addSort("Share Started (UNIX)", "descending");
		// const database = await query.execute();
		// const properties = await database.getPropertiesList();
		// if (!properties.length) {
		// 	return null;
		// }
		// const lastTimestamp = properties[0];
		// const lastUser = lastTimestamp.Holder.relation[0]?.id;
		// if (!lastUser) {
		// 	return null;
		// }
		// const userData = await this.notionContentService.getPage(lastUser);
		// return {
		// 	id: userData.page.properties.IntraID.number,
		// 	name: userData.page.properties.IntraName.title[0].plain_text,
		// 	fullName: userData.page.properties.Name.rich_text[0].plain_text,
		// 	image: userData.page.properties.ProfileImage,
		// 	start: lastTimestamp["Share Started (UNIX)"]?.number,
		// 	end: lastTimestamp["Share Ended (UNIX)"]?.number,
		// }
	}

	getData(): BicycleData {
		return {
			id: this.data.id,
			lockerId: this.data["Locker"],
			name: this.data.Name,
			available: this.data.Availability,
			disabledReason: this.data["Disabled Reason"],
		}
	}
	/*
		Structure property extraction / conversion
	*/
	getName(): string {
		return (this.data.Name);
	}

	/*
		One to many relational extraction
	*/
	async getLastUses(index: number): Promise<Use[]> {
		const time_spamps = await this.databaseTool
			.getTable("Share Timestamps")
			.query()
			.filter("Bicycles", "relation", "contains", this.data.id)
			.sort("Share Started (UNIX)", "descending")
			.get()
			.then((entries: any) => entries.all());

		const all_time_spamps = await time_spamps.map(async (time_stamp: any) => {
			const last_user = await time_stamp["Holder"][0];
			const last_user_data = await last_user();
			const user = await last_user_data;
			const image = await user.ProfileImage;

			return {
				id: user["IntraID"],
				name: user["Name"],
				fullName: user["IntraName"],
				start: time_stamp["Share Started (UNIX)"],
				end: time_stamp["Share Ended (UNIX)"],
				image: image,
			}
		});
		return all_time_spamps;

		// const last_user = await time_spamps[0]["Holder"][0];
		// const last_user_data = await last_user();
		// const user = await last_user_data;
		// console.log("fefewge", user);
		// return [{
		// 	id: user["IntraID"],
		// 	name: user["Name"],
		// 	fullName: user["IntraName"],
		// 	start: time_spamps[0]["Share Started (UNIX)"],
		// 	end: time_spamps[0]["Share Ended (UNIX)"],
		// 	image: {url: user.ProfileImage},
		// }]

		// const query = this.notionContentService.getDatabaseQueryBuilder(
		// 	this.config.TIMESTAMPS
		// );
		// query.and().addFilter("Bicycles", "relation", "contains", this.data.id);
		// query.addSort("Share Started (UNIX)", "descending");
		// const database = await query.execute();
		// const properties = await database.getPropertiesList();
		// if (!properties.length) {
		// 	return [];
		// }
		// const lastTimestamps = properties.slice(index, index + 5);
		// const uses = await lastTimestamps.map(async (timestamp: any, index: number) => {
		// 	const lastUser  = timestamp?.Holder.relation[0]?.id;
		// 	const userData = await this.notionContentService.getPage(lastUser);
		// 	const user = userData.page.properties;
		// 	const startDate = new Date(timestamp["Share Started (UNIX)"].number);
		// 	const endDate = new Date(timestamp["Returned On (UNIX)"].number);
		// 	const options: Intl.DateTimeFormatOptions = { 
		// 		year: 'numeric', 
		// 		month: 'short', 
		// 		day: 'numeric', 
		// 		hour: '2-digit', 
		// 		minute: '2-digit', 
		// 		timeZone: 'Europe/Berlin' 
		// 	};
		// 	if (!user.IntraID) return null;
		// 	return {
		// 		id: user.IntraID.number,
		// 		fullName: user.Name.rich_text[0].plain_text,
		// 		name: user.IntraName.title[0].plain_text,
		// 		image: user.ProfileImage.url,
		// 		start: startDate.toLocaleString('de-DE', options),
		// 		startUnix: timestamp["Share Started (UNIX)"].number,
		// 		end: endDate.toLocaleString('de-DE', options),
		// 		endUnix: timestamp["Returned On (UNIX)"].number,
		// 	}
		// });
		// return uses;
	}

	/*
		Property aquisition method, not related to databases but rather to an entry storage
	*/
	async getImageLink(): Promise<string> {
		// return "etrt";
		// console.log("fefewge ------------", this.data);
		return this.data.retrievePage().then((page: any) => {
			const image = page.results[0].image.file.url;
			// console.log("fefewge", image);
			return image;
		});
		// return this.notionContentService.getPageContent(this.data.id).then((page: any) => {
		//   const image = page.results[0].image.file.url;
		//   return image;
		// });
	}

}