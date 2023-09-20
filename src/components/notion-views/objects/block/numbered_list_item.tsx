import displayRichText, {richText} from "./rich_text/rich_text";
import handleBlock from "../../render/blocksRender";
import listRender from "../../render/listRender";

interface NumberedListItem {
	rich_text: richText[];
}

export default function handleNumberedListItem({
	numbered_list_item,
	children
}: {
	numbered_list_item: NumberedListItem
	children?: any
}): any {

	const richText = displayRichText(numbered_list_item.rich_text);
	return (
		<li key={numbered_list_item.rich_text[0].plain_text} className={"notion-numbered_list-item"}>
			{richText}
			{children && children}
		</li>
	);
}
