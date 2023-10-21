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

type BorrowUpdate = {
	purpose: "borrow";
	user_id: number;
	bicycle_id: number;
	duration: string;
};

type ReturnUpdate = {
	purpose: "return";
	user_id: number;
	bicycle_id: number;
};

type Update = BorrowUpdate | ReturnUpdate;

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
			this.config.TERMS_CONDITIONS
		);
	}



	async update(update: Update) {
		const { purpose, user_id, bicycle_id } = update;
		if (purpose === "borrow") {
			const { duration } = update;
			return await this.registerBicycleBorrow(
				user_id,
				bicycle_id,
				duration
			);
		} else if (purpose === "return") {
			return await this.registerBicycleReturn(user_id, bicycle_id);
		} else {
			throw new BadRequestException("Invalid purpose");
		}
	}

	private async registerBicycleBorrow(
		userId: number,
		bicycleId: number,
		duration: string,
	) {
		const unixTimestamp = new Date().getTime();
		const bicycle_entry_id = await this.databaseTool
			.getTable("Bicycles")
			.getEntry("equals")
			.byLocker(bicycleId)
			.then((entry: any) => entry.id());
		const user_entry_id = await this.databaseTool
			.getTable("SignedUp")
			.getEntry("equals")
			.byIntraID(userId)
			.then((entry: any) => entry.id());
		const response = await this.databaseTool
			.getTable("Share TimeStamps")
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

	private async registerBicycleReturn(userId: number, bicycleId: number) {
		const unixTimestamp = new Date().getTime();
		const bicycle_entry_id = await this.databaseTool
			.getTable("Bicycles")
			.getEntry("equals")
			.byLocker(bicycleId)
			.then((entry: any) => entry.id());
		const user_entry_id = await this.databaseTool
			.getTable("SignedUp")
			.getEntry("equals")
			.byIntraID(userId)
			.then((entry: any) => entry.id());
		console.log("return: ",bicycle_entry_id);
		const items = await this.databaseTool
			.getTable("Share TimeStamps")
			.query()
			.and()
			.filter("Holder", "relation", "contains", user_entry_id)
			.filter("Bicycles", "relation", "contains", bicycle_entry_id)
			.filter("Returned On (UNIX)", "number", "equals", 0)
			.sort("Share Started (UNIX)", "descending")
			.limit(1)
			.get()
		const response = await items.update("Returned On (UNIX)", "number", unixTimestamp);
		console.log("items update: ", response);
		return response;
	}



	async getBicycles(): Promise<BicycleInfo[] | null> {
		const properties = await this.databaseTool
			.getTable("Bicycles")
			.getEntries()
			.all()
			.then((entries: any) => entries.all());

		const bicycles = properties.map((property: any) => {
			return new BicycleInfo(
				property,
				this.databaseTool,
				);
		});
		return bicycles;
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
			.getEntry()
			.byLocker(id)
			.then((entry: any) => entry.all());
		if (!properties.length) {
			throw new NotFoundException("No bicycle found");
		}
		const bicycleData = await properties[0];
		return new BicycleInfo(
			bicycleData,
			this.databaseTool,
		);
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
	name: string;
	image: string
}

type Ownership = {
	since: number;
	intendedDuration: string;
	bicycle_name: string;
	bicycle_id: number;
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

	async userOwnsBicycle(id: number): Promise<Ownership | null> {
		const user = await this.databaseTool
			.getTable("SignedUp")
			.getEntry()
			.byIntraID(id)
			.then((entry: any) => entry.all());
		if (!user.length) return null;
		const user_id = user[0].id;
		const latest_use_timestamps = await this.databaseTool
			.getTable("Share TimeStamps")
			.query()
			.filter(
				"Holder",
				"relation",
				"contains",
				user_id
			)
			.sort("Share Started (UNIX)", "descending")
			.limit(1)
			.get()
			.then((entry: any) => entry.all());
		if (latest_use_timestamps.length === 0) {
			return null;
		}
		const latest_use_timestamp = latest_use_timestamps[0];
		// a returned bicycle is not owned
		if (latest_use_timestamp["Returned On (UNIX)"] !== 0) return null;
	
		const the_possesed_bicycle = await latest_use_timestamp["Bicycles"][0]();
		const ownership: Ownership = {
			since: latest_use_timestamp["Share Started (UNIX)"],
			intendedDuration: latest_use_timestamp["Intended Duration"],
			bicycle_name: the_possesed_bicycle["Name"],
			bicycle_id: the_possesed_bicycle["Locker"],
		}
		return ownership;
	}

	async getUserByIntraID(userID: number): Promise<User | null> {
		const properties = await this.databaseTool
			.getTable("SignedUp")
			.getEntry()
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
	}

	public getUserInterface(user: TokenUser
	): UserInterface {
		return new UserInterface({
				id: user.id,
				name: user.login,
				fullName: `${user.name}`,
				image: user.image,
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
		if (response.object !== "page") {
			return {message: "User not registered", status: 400};
		}
		return {message: "User registered", status: 200};
	}

	/*
		Insertion method
	*/
	private async RegisterUser(): Promise<any> {
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
	}

	/*
		Checks if the user already exists in the database
	*/
	private async exists(): Promise<boolean> {
		const query = await this.databaseTool
			.getTable("SignedUp")
			.getEntry()
			.byIntraID(this.user.id)
			.then((entry: any) => entry.all());
		return query.length > 0;
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
			.getTable("Share TimeStamps")
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
		if (!last_user) return null;
		const user = await last_user();
		return {
			id: user["IntraID"],
			name: user["Name"],
			fullName: user["IntraName"],
			start: test[0]["Share Started (UNIX)"],
			end: test[0]["Share Ended (UNIX)"],
			image: {url: user.ProfileImage},
		}
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
			.getTable("Share TimeStamps")
			.query()
			.filter("Bicycles", "relation", "contains", this.data.id)
			.sort("Share Started (UNIX)", "descending")
			.get()
			.then((entries: any) => entries.all());

		const all_time_spamps = await time_spamps.map(async (time_stamp: any) => {
			const last_user = await time_stamp["Holder"][0];
			if (!last_user) return [];
			const last_user_data = await last_user();
			const user = await last_user_data;
			const image = await user.ProfileImage;
			const startDate = this.timeLocaleConvert(time_stamp["Share Started (UNIX)"])
			const endDate = this.timeLocaleConvert(time_stamp["Share Ended (UNIX)"])

			return {
				id: user["IntraID"],
				name: user["Name"],
				fullName: user["IntraName"],
				start: startDate,
				end: endDate,
				image: image,
			}
		});
		return all_time_spamps;
	}

	private timeLocaleConvert(time: number): string {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Berlin'
		};

		return new Date(time).toLocaleString('de-DE', options);
	}

	/*
		Property aquisition method, not related to databases but rather to an entry storage
	*/
	async getImageLink(): Promise<string> {
		return this.data.retrievePage().then((page: any) => {
			const image = page.results[0].image.file.url;
			return image;
		});
	}

}