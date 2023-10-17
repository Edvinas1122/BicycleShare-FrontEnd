import 
	BicycleShareContentService,
	{UserService}
from "@/components/bicycle-api/content.service";
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
import 
	NotionFormatterService
from "@/components/bicycle-api/format-adapter.service";
import { 
	NotionDatabaseTool,
	TableProps
 } from "./notion-database-tool";
import { DatabaseList, propertyExtractors } from "./format-adapter.service";

const serviceTables = (): TableProps[] => [
	{
		name: "Bicycles",
		database_id: getConfiguration().BICYCLES as string,
		properties: {
			key: {
				property: "ID",
				property_type: "number",
			},
			properties: [{
					property: "Name",
					property_type: "rich_text",
				},{
					property: "ID",
					property_type: "number",
				},{
					property: "Locker",
					property_type: "number",
				}, {
					property: "Disabled Reason",
					property_type: "rich_text",
				}, {
					property: "Availability",
					property_type: "select",
				}
			]}
	},
	{
		name: "Share Timestamps",
		database_id: getConfiguration().TIMESTAMPS as string,
		properties: {
			key: {
				property: "empty",
				property_type: "empty",
			},
			properties: [{
				property: "Holder",
				property_type: "relation",
			},{
				property: "Bicycles",
				property_type: "relation",
			},{
				property: "Share Started (UNIX)",
				property_type: "number",
			},{
				property: "Returned On (UNIX)",
				property_type: "number",
			},{
				property: "Intended Duration",
				property_type: "select",
			}
		]}
	},
	{
		name: "SignedUp",
		database_id: getConfiguration().SIGNED_USERS_DATABASE as string,
		properties: {
			key: {
				property: "IntraName",
				property_type: "title",
			},
			properties: [{
				property: "Name",
				property_type: "rich_text",
			},{
				property: "ProfileImage",
				property_type: "url",
			},{
				property: "IntraID",
				property_type: "number",
			},
			{
				property:"IntraName",
				property_type: "title",
			}
		]}
	},
]

export function constructServiceDatabaseTool(
	cache?: { [key: string]: any }
): NotionDatabaseTool
{
	const notionConfig = getNotionConfig();
	const notionAPI = new NotionAPI(
		notionConfig.integrationToken,
		notionConfig.rootPageId
	);
	const notionService = new NotionService(
		notionAPI,
		cache
	);
	const databaseTool = new NotionDatabaseTool(
		notionService,
		serviceTables(),
		// entry method provider
		(data: any) => new DatabaseList(
			data,
			notionService
		),
		propertyExtractors
	);
	return databaseTool;
}

import
	buildNotionDatabaseTool
from "@edvinas1122/notion-database-tool";

function constructFormatterService(cache?: { [key: string]: any }) {
	const notionConfig = getNotionConfig();
	if (!notionConfig.integrationToken) throw new Error("No integration token provided");
	const notionAPI = new NotionAPI(notionConfig.integrationToken);
	const notionService = new NotionService(notionAPI, cache);
	const notionFormatterService = new NotionFormatterService(notionService);
	return notionFormatterService;
}

function constructBicycleService(cache?: { [key: string]: any }) {
	const notionConfig = getNotionConfig();
	if (!notionConfig.integrationToken) throw new Error("No integration token provided");
	const bicycleShareContentService = new BicycleShareContentService(
		constructFormatterService(cache),
		buildNotionDatabaseTool(
			notionConfig.integrationToken,
			serviceTables(),
			cache
		),
		getConfiguration()
	);
	return bicycleShareContentService;
}

export function constructUserService(cache?: { [key: string]: any }) {
	// const notionAPI = new NotionAPI(notionConfig.integrationToken, notionConfig.rootPageId);
	// const notionService = new NotionService(notionAPI, cache);
	// const notionFormatterService = new NotionFormatterService(notionService);
	const notionConfig = getNotionConfig();
	if (!notionConfig.integrationToken) throw new Error("No integration token provided");
	const userService = new UserService(
		// notionFormatterService,
		// getConfiguration(),
		buildNotionDatabaseTool(
			notionConfig.integrationToken,
			serviceTables(),
			cache
		),
	);
	return userService;
}

export default constructBicycleService;