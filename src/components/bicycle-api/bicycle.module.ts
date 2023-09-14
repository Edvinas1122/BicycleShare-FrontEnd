import 
	BicycleShareContentService
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


function constructBicycleService(cache?: { [key: string]: any }) {
	const notionAPI = new NotionAPI();
	const notionService = new NotionService(notionAPI, cache);
	const notionFormatterService = new NotionFormatterService(notionService);
	const bicycleShareContentService = new BicycleShareContentService(
		notionFormatterService
	);
	return bicycleShareContentService;
}

export default constructBicycleService;