import ParseError from "./utils/error";
import BlocksView from "./render/blocks";


const NotionPageData = async ({
	list
}: {
	list: any
}) => {
	if (!list?.object || list.object !== 'list' || list.results === undefined) {
		return (
			<ParseError />
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

export default NotionPageData;