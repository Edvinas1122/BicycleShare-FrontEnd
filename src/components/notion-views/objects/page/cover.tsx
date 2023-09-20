import Image from 'next/image';
import { File } from "../block/icon";

interface CoverProps {
	cover: {
			type: string,
			file: File,
	}
	title: any;
}

export default function CoverView({
	cover,
}: CoverProps ): any
{

	if (!cover?.file?.file.url) return null;

	return (
		<div className="notion-page-cover-wrapper">
			<Image
				src={cover.file.file.url}
				fill={true}
				alt="cover"
			/>
		</div>
	);
}