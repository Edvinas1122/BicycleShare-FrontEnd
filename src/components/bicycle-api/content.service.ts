import NotionService from "../notion-api/notion.service";
import NotionFormatterService from "./format-adapter.service";
import { BadRequestException, NotFoundException } from "../next-api-utils/exceptions";

/*
	Provides data from Expected (Bicycle Share Template) notion templated page

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

// const configuration: ServiceConfig = {
// 	TERMS_CONDITIONS: process.env.TERMS_CONDITIONS_PAGE_ID,
// 	HOW_TO_USE: process.env.TUTORIAL_PAGE_ID,
// 	BICYCLES: process.env.BICYCLES_DATABASE,
// 	TIMESTAMPS: process.env.TIMESTAMPS_DATABASE,
// 	DEV: process.env.ROOT_PAGE_ID,
// }

export default class BicycleShareContentService {
	constructor(
		private notionContentService: NotionFormatterService,
		// private config: ServiceConfig = configuration,
	) {
		if (process.env.TERMS_CONDITIONS_PAGE_ID === undefined) throw new Error("No terms and conditions page id found");
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
			process.env.TERMS_CONDITIONS_PAGE_ID
		);
	}

	async getHowToUse() {
		return await this.getContent(process.env.TUTORIAL_PAGE_ID);
	}

	async getBicycles() {
		const list = await this.getDatabase(process.env.BICYCLES_DATABASE);
		return list.map((item: any) => {
			return {
				lockerId: item.Locker.number,
				item: item,
				name: item.Name.title[0].plain_text,
				disabledReason: item["Disabled Reason"].rich_text[0],
			}
		})
	}

	async getTimeStamps() {
		return await this.getDatabase(process.env.TIMESTAMPS_DATABASE);
	}

	async getRootPage() {
		return await this.getContent(process.env.ROOT_PAGE_ID);
	}

	private async getContent(id?: string): Promise<any> {
		if (!id) throw new NotFoundException("No page found");
		return this.notionContentService.getPageContent(id);
	}

	private async getDatabase(id?: string): Promise<any> {
		if (!id) throw new NotFoundException("No database found");
		return this.notionContentService.getPropertiesList(id);
	}
}