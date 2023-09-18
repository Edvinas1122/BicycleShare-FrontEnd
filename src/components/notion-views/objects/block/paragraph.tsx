import React from 'react';
import displayRichText, { richText } from './rich_text/rich_text';

interface Paragraph {
	rich_text: richText[];
}

export default function handleParagraph({
	paragraph
}: {
	paragraph: Paragraph,
}): any {
	const richText: JSX.Element[] | null = displayRichText(paragraph.rich_text);
	return (
		<p className={"notion-paragraph"}>
			{richText && richText}
		</p>
	);
}