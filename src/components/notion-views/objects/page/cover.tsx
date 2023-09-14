import Image from 'next/image';

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

	return (
		<div className="notion-page-cover-wrapper">
			<Image
				src={cover.file.url}
				fill={true}
				alt="cover"
			/>
		</div>
	);
}