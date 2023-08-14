// "use client";
import serverFetch from "./serverFetch";
import NotionPageData from "@edvinas1122/notion-views/NotionPage";

export default async function InfoPage() {

	const apiInfo = await serverFetch("http://backend:3030/content/terms-and-conditions");
	return (
		<>
			<NotionPageData
				list={apiInfo}
			/>
			<h1>here</h1>
		</>
	);
}