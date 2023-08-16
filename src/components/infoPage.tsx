"use client";
import serverFetch from "./serverFetch";
import NotionPageData from "./notion-views/NotionPage";


export default async function InfoPage({
	apiInfo,
}: {
	apiInfo: any;
}) {

	// const apiInfo = await serverFetch("http://backend:3030/content/terms-and-conditions");
	console.log(apiInfo);
	return (
		<>
			<NotionPageData
				list={apiInfo}
			/>
			<h1>here</h1>
		</>
	);
}