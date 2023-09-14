import handleMention from "./mention";
import handleEquation from "./equation";

export interface richText {
	type: string;
	text: {
		content: string;
		link?: string;
	};
	annotations: {
		bold: boolean;
		italic: boolean;
		strikethrough: boolean;
		underline: boolean;
		code: boolean;
		color: string;
	};
	plain_text: string;
	href: string;
}

type richTextHandler = (richText: richText) => any;

const richTextHandlers: { [key: string]: richTextHandler} = {
	"text": handleText,
	"mention": handleMention,
	"equation": handleEquation,
};

export default function displayRichText(richTextSegments: richText[]) {
	if (!richTextSegments) {
		return;
	}
	return richTextSegments.map((richTextSegment) => {
					const handler = richTextHandlers[richTextSegment.type];
					if (!handler) {
						console.warn(`No handler for rich text type ${richTextSegment.type}`);
						return;
					}
					return handler(richTextSegment);
				});
}

function handleText(richText: richText) {
	if (richText.text.link) {
		return (
			<a target="_blank" rel="noopener noreferrer" href={richText.text.link} className={"notion-link"}>
				{richText.text.content}
			</a>
		);
	}

	return (
		<>
			{richText.text.content}
		</>
	);
}
