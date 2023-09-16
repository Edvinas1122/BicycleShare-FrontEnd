"use client";
import React from "react";
import serverFetch from "./serverFetch";
import NotionPageData from "./notion-views/NotionPage";
import { Skeleton } from "@nextui-org/react";


export default function InfoPage({
	
}) {

	const [notionPageData, setNotionPageData] = React.useState(null);

	React.useEffect(() => {
		// setLoading(false);
		fetch("/api/app/?content=terms-and-conditions").then((data) => {
			// setNotionPageData(data);
			console.log(data);
		});
		// exampleFetch().then((data) => {
		// 	// setNotionPageData(data);
		// 	console.log(data);
		// });
	}, []);
	return (
		<>
			{notionPageData ? 
				<NotionPageData
					list={notionPageData}
				/> :
				<h1>Loading</h1>
			}
		</>
	);
}