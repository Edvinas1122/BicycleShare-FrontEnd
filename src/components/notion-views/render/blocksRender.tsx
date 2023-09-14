import handleCallout from "../objects/block/callout";
import handleParagraph from "../objects/block/paragraph";
import handleChildDatabase from "../objects/block/child_database";
import { handleHeading_1, handleHeading_2, handleHeading_3 } from "../objects/block/heading";
import handleNumberedListItem from "../objects/block/numbered_list_item";


export enum BlockType {
	callout = "callout",
	child_database = "child_database",
	paragraph = "paragraph",
	heading_1 = "heading_1",
	heading_2 = "heading_2",
	heading_3 = "heading_3",
	rich_text = "rich_text",
	numbered_list_item = "numbered_list_item",
}

type BlockContent = {
	[type in BlockType]: any;
};

export type notionBlock = {
	id: string;
	type: BlockType | string;
	has_children: boolean;
	children?: notionBlock[];
} & BlockContent;


interface BlockProps {
	children?: any,
}

type BlockSpecifics = BlockContent & BlockProps;

type BlockHandler = (content: BlockSpecifics) => any;

const blockHandlers: { [key: BlockType | string]: BlockHandler } = {
	[BlockType.callout]: handleCallout,
	[BlockType.child_database]: handleChildDatabase,
	[BlockType.paragraph]: handleParagraph,
	[BlockType.heading_1]: handleHeading_1,
	[BlockType.heading_2]: handleHeading_2,
	[BlockType.heading_3]: handleHeading_3,
	[BlockType.numbered_list_item]: handleNumberedListItem,
	// "Bookmark": handleBookmark,
	// "Breadcrumb": handleBreadcrumb,
	// "Bulleted list item": handleBulleted,
	// "Child page": handleChild_page,
	// "Code": handleCode,
	// "Column list and column": handleColumn_list,
	// "Divider": handleDivider,
	// "Embed": handleEmbed,
	// "Equation": handleEquation,
	// "File": handleFile,
	// "Headings": handleHeadings,
	// "Image": handleImage,
	// "Link Preview": handleLink,
	// "Mention": handleMention,
	// "Numbered list item": handleNumbered,
	// "PDF": handlePDF,
	// "Quote": handleQuote,
	// "Synced block": handleSynced,
	// "Table": handleTable,
	// "Table of contents": handleTable,
	// "Template": handleTemplate,
	// "To do": handleTo,
	// "Toggle blocks": handleToggle,
	// "Video": handleVideo,
};

import BlocksView from "./blocks";

function childrenBlocks(block: notionBlock) { // recursive children blocks
	if (!block.has_children) {
		return [];
	}
	return (
		<>
			<BlocksView
				blocks={block.children.results}
			/>
		</>
	);
}

export default function Block({
	block,
}: {
	block: notionBlock;
}): any {
	// console.log(block.type);
	const handler = blockHandlers[block.type];
	if (!handler) {
	  console.warn(`No handler for block type ${block.type}`);
	  return;
	}
	const childrenElements = block.has_children ? childrenBlocks(block) : undefined;
	const content: BlockSpecifics = {
		[block.type]: block[block.type],
		children: childrenElements,
	};
	const html = handler(content);
	return (
		<>
			{html}
		</>
	);
}
