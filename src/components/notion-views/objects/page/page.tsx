import { Icon } from "../block/icon";
import CoverView from "./cover";
import TitleIcon from "./title_icon";
import { File } from "../block/icon";

interface Page {
	id: string;
	created_time: string;
	last_edited_time: string;
	created_by: {object: string, id: string};
	last_edited_by: {object: string, id: string};
	cover: {
		type: string,
		page_cover: {
			type: string,
			file: File,
		},
	},
	icon: Icon,
	parent: any;
	archived: boolean;
	properties: { [key: string]: any } | {title: {title: any[];}};
	url: string;
	public_url: string;
}

interface PageViewProps {
	page: Page;
	children: any;
}


export default function NotionPageView({
	page,
	children,
}: PageViewProps ): any
{
	const cover = page.cover;
	const icon = page.icon;
	const title = page.properties.title.title[0].plain_text;
	return (
		<div className="notion-page-scroller">
			{/* <CoverView
				cover={cover}
			/> */}
			<main className="notion-page
				notion-page-has-cover
				notion-page-has-icon
				notion-page-has-image-icon
				notion-full-page
				index-page"
			>
			<TitleIcon
				icon={icon as File}
				title={title}
			/>
			{children}
			</main>
		</div>
	);
}