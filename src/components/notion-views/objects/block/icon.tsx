interface File {
	url: string;
	expiry_time: string;
}

export interface Icon {
	type: string;
	emoji?: string;
 	file?: File;
}

type IconHandler = (icon: Icon) => any;

function handleEmoji(icon: Icon): any {
	return (
		<div className={"notion-page-icon-inline notion-page-icon-span"}>
			{icon.emoji}
		</div>
	);
}

function handleFile(icon: Icon): any {
	return (
		<div>
			{icon.file.url}
		</div>
	);
}

const iconHandlers: { [key: string]: IconHandler } = {
	"emoji": handleEmoji,
	"file": handleFile,
}

export default function handleIcon({
	icon
}: {
	icon: Icon
}): any {
	console.log(icon);
	const handler = iconHandlers[icon.type];
	if (!handler) {
		console.warn(`No handler for icon type ${icon.type}`);
		return;
	}
	return handler(icon);
}
