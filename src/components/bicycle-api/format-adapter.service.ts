import NotionService from "../notion-api/notion.service";
import { BadRequestException, ConflictException } from "../next-api-utils/exceptions";


/*
	Provides a service for mapping content that requires
	paraller requests to Notion's API.
*/

interface NotionBlock {
	object: string;
	id: string;
	type: string;
	has_children: boolean;
	children?: NotionBlock[];
	numbered_list_item?: any;
	child_database?: any;
}

enum NestedBlocks {
	// page = "page",
	bulleted_list_item = "bulleted_list_item",
	numbered_list_item = "numbered_list_item",
	child_page = "child_page",
	// to_do = "to_do",
	// quote = "quote",
	// callout = "callout",
}

interface FormatConfiguration {
	nestedTypes: string[];
	linkedTypes: string[];
}

const FormatConfiguration: FormatConfiguration = {
	nestedTypes: [
		NestedBlocks.numbered_list_item,
		NestedBlocks.bulleted_list_item,
	],
	linkedTypes: [
		NestedBlocks.child_page,
	],

}

export default class NotionFormatterService {
	constructor(
		private notion: NotionService,
	) {}

	async getPageContent(pageId?: string): Promise<NotionBlock[]> {
		const list = await this.notion.getBlockChildren(pageId);
		if (!list.results) throw new BadRequestException("No results found");
		const updatedList = await this.handleSubBlocks(list.results);
		list.results = updatedList;
		return list;
	}

	async getPropertiesList(databeseId?: string): Promise<any[]> {
		const list = await this.notion.queryDatabase(databeseId);
		if (!list.results) throw new BadRequestException("No results found");
		const filteredList = list.results.map((item: any) => {
			return item.properties;
		});
		return filteredList;
	}

	private async handleSubBlocks(blocks: NotionBlock[]): Promise<NotionBlock[]> {
		const updatedList = await Promise.all(blocks.map(async (block: NotionBlock) => {
			if (block.has_children === false) return block;
			return this.getBlockSubContents(block);
		}));
		return updatedList;
	}

	private async getBlockSubContents(block: NotionBlock): Promise<NotionBlock> {
		if (FormatConfiguration.nestedTypes.includes(block.type)) {
			return await this.handleNestedBlock(block);
		} else if (FormatConfiguration.linkedTypes.includes(block.type)) {
			return await this.handleLinkedBlocks(block);
		}
		return block;
	}

	private async handleNestedBlock(block: NotionBlock): Promise<NotionBlock> {
		const children = await this.notion.getBlockChildren(block.id);
		if (!children.results) throw new ConflictException({ message: "notion api data integrity logic failure" });
		children.results = await this.handleSubBlocks(children.results);
		block.children = children;
		return block;
	}

	private async handleLinkedBlocks(block: NotionBlock): Promise<NotionBlock> {
		const linkedPage = await this.notion.getPage(block.id);
		if (!linkedPage.properties) throw new ConflictException({ message: "notion api data integrity logic failure" });
		block.children = linkedPage;
		return block;
	}
}
