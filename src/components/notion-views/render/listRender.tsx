import ParseError from "../utils/error";
import BlocksView from "./blocks";


export default function ListRender({
	list
}: {
	list: any; // notionBlock[]
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