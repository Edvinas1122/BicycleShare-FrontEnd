export const notionConfig = {
	integrationToken: process.env.NOTION_API_TOKEN,
	rootPageId: process.env.ROOT_PAGE_ID,
};

export const getNotionConfig = () => {
	return notionConfig;
}