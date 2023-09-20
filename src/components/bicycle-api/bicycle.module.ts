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
import{
	getConfiguration
} from "@/conf/content.conf";

import {
	getNotionConfig
} from "@/conf/notion.conf"

function constructBicycleService(cache?: { [key: string]: any }) {
	const notionConfig = getNotionConfig();
	const notionAPI = new NotionAPI(notionConfig.integrationToken, notionConfig.rootPageId);
	const notionService = new NotionService(notionAPI, cache);
	const notionFormatterService = new NotionFormatterService(notionService);
	const bicycleShareContentService = new BicycleShareContentService(
		notionFormatterService,
		getConfiguration()
	);
	return bicycleShareContentService;
}

export function constructUserService(cache?: { [key: string]: any }) {
	const notionConfig = getNotionConfig();
	const notionAPI = new NotionAPI(notionConfig.integrationToken, notionConfig.rootPageId);
	const notionService = new NotionService(notionAPI, cache);
	const notionFormatterService = new NotionFormatterService(notionService);
	const userService = new UserService(
		notionFormatterService,
		getConfiguration()
	);
	return userService;
}

export default constructBicycleService;