"use client";

import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { dictionaries, Language } from "@/conf/dictionary.conf";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export enum Durrations {
	SHORT = "short",
	HOURS = "hours",
	LONG = "long",
	NIGHT = "night",
}

export default function DurrationSelect({
	language,
}: {
	language: Language;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const tabData = [
		{
			key: Durrations.SHORT,
			title: dictionaries[language].short,
			content: dictionaries[language].short_description,
		},
		{
			key: Durrations.HOURS,
			title: dictionaries[language].hours,
			content: dictionaries[language].hours_description,
		},
		daytimeDependantLongSelectionOption(language),
	];

	const current = searchParams.get("time");
	const currentTab = current ? current : Durrations.SHORT;

	const onChangeHandler = (key: React.Key): any => {
		router.replace(pathname + "?time=" + key)
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
			selectedKey={currentTab}
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

function daytimeDependantLongSelectionOption(language: Language) {
	const long_option = new Date();
	const hour = long_option.getHours();
	if (hour > 5 && hour < 21) {
		return {
				key: Durrations.LONG,
				title: dictionaries[language].long,
				content: dictionaries[language].long_description,
		}
	} else {
		return {
				key: Durrations.NIGHT,
				title: dictionaries[language].over_night,
				content: dictionaries[language].over_night_description,
		}
	}
}