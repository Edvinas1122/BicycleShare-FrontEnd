import ParseError from "../utils/error";
import BlocksView from "./blocks";
import { notionBlock } from "./blocksRender";


export default function ListRender({
	list
}: {
	list: notionBlock
}) {
	if (list.object !== 'list' || list.results === undefined) {
		return (
			<ParseError
			/>
		);
	}

	return (
		<>
			<BlocksView
				blocks={list.results}
			/>
		</>
	);
}