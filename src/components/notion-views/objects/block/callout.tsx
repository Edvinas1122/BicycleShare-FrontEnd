import displayRichText, {richText} from "./rich_text/rich_text";
import handleIcon, {Icon} from "./icon";

interface Callout {
	rich_text: richText[];
	icon: Icon;
	color: string;
}

export default function handleCallout({
	callout
}: {
	callout: Callout
}): any {
	console.log(callout);
	const richText = displayRichText(callout.rich_text);
	// const icon = handleIcon(callout.icon);
	const color = callout.color;
	return (
		<div className={"notion-callout notion-default_co"}>
			{/* {icon} */}
			{richText}
		</div>
	);
}