import 
	BicycleShareContentService,
	{UserService}
from "@/components/bicycle-api/content.service";
import 
	NotionFormatterService
from "@/components/bicycle-api/format-adapter.service";
import
	NotionService
from "@/components/notion-api/notion.service";
import
	NotionAPI
from "@/components/notion-api/api";

const configuration: ServiceConfig = {
	TERMS_CONDITIONS: process.env.TERMS_CONDITIONS_PAGE_ID,
	HOW_TO_USE: process.env.TUTORIAL_PAGE_ID,
	BICYCLES: process.env.BICYCLES_DATABASE,
	TIMESTAMPS: process.env.TIMESTAMPS_DATABASE,
	DEV: process.env.ROOT_PAGE_ID,
	SIGNED_USERS_DATABASE: process.env.SIGNED_USERS_DATABASE,
}

function constructBicycleService(cache?: { [key: string]: any }) {
	const notionAPI = new NotionAPI();
	const notionService = new NotionService(notionAPI, cache);
	const notionFormatterService = new NotionFormatterService(notionService);
	const bicycleShareContentService = new BicycleShareContentService(
		notionFormatterService,
		configuration
	);
	return bicycleShareContentService;
}

export function constructUserService(cache?: { [key: string]: any }) {
	const notionAPI = new NotionAPI();
	const notionService = new NotionService(notionAPI, cache);
	const notionFormatterService = new NotionFormatterService(notionService);
	const userService = new UserService(
		notionFormatterService,
		configuration
	);
	return userService;
}

export default constructBicycleService;