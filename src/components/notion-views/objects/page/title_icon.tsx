import { Icon } from "../block/icon";
import Image from 'next/image';

export default function TitleIcon({
	icon,
	title,
}: {
	icon: Icon,
	title: string
}): any
{
	// console.log(title);
	return (
		<>
		<div className="notion-page-icon-hero notion-page-icon-image">
			<span>
				<Image
					src={icon.file.url}
					// fill={true}
					width={120}
					height={120}
					alt="icon"
					/>
			</span>
		</div>
		<h1 className="notion-title">
				{title}
		</h1>
		</>
	);
}