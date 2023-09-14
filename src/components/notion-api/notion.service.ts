import NotionAPI from "./api";

export default class NotionService {
	constructor(
		private api: NotionAPI,
		private otherParams?: any,
	) {}

	async getPage(pageId?: string, other?: any) {
		return this.api.getPage({
			params: pageId ? { pageId: pageId } : undefined,
			other: this.otherParams,
		});
	}

	async getDatabase(databaseId?: string, other?: any) {
		return this.api.getDatabase({
			params: databaseId ? { databaseId: databaseId } : undefined,
			other: this.otherParams,
		});
	}

	async getBlockChildren(blockId?: string, other?: any) {
		return this.api.getBlockChildren({
			params: blockId ? { blockId: blockId } : undefined,
			other: this.otherParams,
		});
	}

	async getBlock(blockId?: string, other?: any) {
		return this.api.getBlockChildren({
			params: blockId ? { blockId: blockId } : undefined,
			other: this.otherParams,
		});
	}

	async queryDatabase(databaseId?: string, other?: any) {
		return this.api.queryDatabase({
			params: databaseId ? { databaseId: databaseId } : undefined,
			other: this.otherParams,
		});
	}

	async search(query: string, other?: any) {
		return this.api.search({
			body: {
				query: query,
			},
			other: this.otherParams,
		});
	}
}