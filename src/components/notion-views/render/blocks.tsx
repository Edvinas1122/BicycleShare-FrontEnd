import Block, {BlockType, notionBlock} from "./blocksRender";

interface BlocksViewProps {
	blocks: notionBlock[];
}

enum WrappedListType {
	numbered_list_item,
	bulleted_list_item,
}

function listRender(list: notionBlock[]): JSX.Element {
	return (
		<ol key={list[0].id} className={"notion-list"}>
			{list.map((block) => {
				return (
					<Block
						key={block.id}
						block={block}
					/>
				);
			})}
		</ol>
	);
}

export default function BlocksView({
	blocks
}: BlocksViewProps
) {
	let list: any = [];
	return blocks.map((block, index) => {
		if (block.type === BlockType.numbered_list_item) {
			list.push(block);
			if (index === blocks.length - 1) {
				return listRender(list);
			}
			return;
		} else {
			if (list.length > 0) {
				const contents = listRender(list);
				list = [];
				return contents;
			}
		}
		return (
			<Block
				key={block.id}
				block={block}
			/>
		);
	});
}