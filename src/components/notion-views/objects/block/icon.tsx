export type File = {
	type: "file";
	file: {
		url: string;
		expiry_time: string;
	};
};

type Emoji = {
	type: "emoji";
	emoji: string;
};

export type Icon = File | Emoji;

function handleEmoji(icon: Emoji): JSX.Element | null {
	return (
		<div className={"notion-page-icon-inline notion-page-icon-span"}>
			{icon.emoji}
		</div>
	);
}

function handleFile(icon: File): JSX.Element | null {
	return (
		<div>
			{icon.file.url}
		</div>
	);
}

type IconHandler = (icon: any) => JSX.Element | null;


const iconHandlers = {
	emoji: handleEmoji,
	file: handleFile,
};

function isCompatibleIcon(icon: Icon): boolean {
	return icon.type in iconHandlers;
}

export default function handleIcon(icon?: Icon): JSX.Element | null {
	if (!icon) return null;
	if (!isCompatibleIcon(icon)) throw new Error(`No handler for icon type ${icon.type}`);
	const handler: IconHandler = iconHandlers[icon.type];
	if (!handler) {
		console.warn(`No handler for icon type ${icon.type}`);
		return null;
	}
	return handler(icon);
}