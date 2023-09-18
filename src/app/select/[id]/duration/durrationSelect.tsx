"use client";

import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { dictionaries } from "@/conf/dictionary.conf";
import { 
	useModalContext
} from "@/app/components/modal";

export default function DurrationSelect() {
	const { setSharedState } = useModalContext();
	const tabData = [
		{
			key: "short",
			title: dictionaries.en.short,
			content: dictionaries.en.short_description,
		},
		{
			key: "hours",
			title: dictionaries.en.hours,
			content: dictionaries.en.hours_description,
		},
		{
			key: "long",
			title: dictionaries.en.long,
			content: dictionaries.en.long_description,
		},
	];

	const onChangeHandler = (key: React.Key): any => {
		setSharedState(key);
		return {message: "this goes somewhere?"}
	};
	return (
		<div className="flex w-full flex-col">
		<Tabs aria-label="Options"
			classNames={{
				tabList: "w-full flex flex-row justify-between",
				tabContent: "w-full flex flex-col justify-center text-center",
			}}
			onSelectionChange={onChangeHandler}
			variant={"light"}
			size={"lg"}
		>
		{tabData.map((tab) => (
			<Tab key={tab.key} title={tab.title}>
			<Card>
				<CardBody className={"w-full flex flex-col justify-center text-center text-sm"}>
				{tab.content}
				</CardBody>
			</Card>
			</Tab>
		))}
		</Tabs>
		</div>  
	);
}