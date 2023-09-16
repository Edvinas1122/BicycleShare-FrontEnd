"use client";
import React, {use, Suspense} from "react";
import ParseError from "./utils/error";
import BlocksView from "./render/blocks";


const NotionPageData = ({
	data
}: {
	data: Promise<any>
}) => {

	const list = use(data);

	if (!list?.object || list.object !== 'list' || list.results === undefined) {
		return (
			<ParseError />
		);
	}

	return (
		<>
			<BlocksView
				blocks={list.results}
			/>
		</>
	);
}

export default NotionPageData;