import { Suspense } from "react";
import BicycleCard, {UserAvatar, UserSkeleton, ImageSuspense, ImageSkeleton} from "../components/BicycleCard";
import constructBicycleService from "@/components/bicycle-api/bicycle.module";
import BicycleListWrapper from "../components/BicycleWrapper";
import { BicycleInfo } from "@/components/bicycle-api/content.service";
import { Language, dictionaries } from "@/conf/dictionary.conf";
import { redirect, RedirectType } from "next/navigation";

export default async function Page({params: {lang}}: {params: {lang: Language}}) {
	// const bicycleService = constructBicycleService({cache: 'no-store'});
	const bicycleService = constructBicycleService({next: {tags: ["bicycle"]}});
	const bicycles: BicycleInfo[] | null = await bicycleService.getBicycles();

	const buttons = [
		{
			label: dictionaries[lang].reserve,
			route: "?press=select",
		},
		{
			label: dictionaries[lang].last_users,
			route: "?press=last-users",
		},
	];

	const selectBicycle = async (path: string) => {
		"use server";
		redirect(path, RedirectType.replace);
	};

	if (!bicycles) {
		return null;
	}

	return (
		<>
		{
			bicycles.map((bicycle) => (
				<BicycleCard
					key={bicycle.data.id}
					props={bicycle.data}
					header={
						<BicycleHeader
							title={bicycle.data.name}
							availability={bicycle.data.available}
							user={bicycle.getLastUse()}
							language={lang}
						/>

					}
					language={lang}
					buttons={buttons}
					action={selectBicycle}
				>
					<Suspense fallback={<ImageSkeleton/>}>
						<Image
							imageLink={bicycle.getImageLink()}
							alt={bicycle.data.name}
						/>
					</Suspense>
				</BicycleCard>
			))
		}
		</>
	);
}

type UseInfo = {
	id: string;
	name: string;
	fullName: string;
	image: {url:string}
	start: number;
	end: number;
}

async function BicycleHeader({
	title,
	availability,
	user,
	language,
}: {
	title: string;
	availability: boolean;
	user: Promise<UseInfo | null>;
	language: Language;
}) {

	const classNames = `
		flex
		flex-row
		justify-between
		items-center
		w-full
	`;


	// const availabilityInfo = availability ? 
	// 	dictionaries[language].returned_by :
	// 	dictionaries[language].held_by;

	return (
		<div className={classNames}>
			<h2 className={"text-xl"}>
				{title}
			</h2>
			<div>
			<Suspense fallback={<UserSkeleton/>}>
				<Avatar
					user={user}
					lang={language}
				/>
			</Suspense>
			</div>
		</div>
	);
}

async function Avatar({
	user,
	lang,
}: {
	user: Promise<UseInfo | null>;
	lang: Language;
}) {

	const resolvedUser = await user;
	if (!resolvedUser) return null;
	const availabilityInfo = resolvedUser.end ? dictionaries[lang].returned_by : dictionaries[lang].held_by;
	console.log("availabilityInfo", resolvedUser.start);
	const durationInfo = new Date(resolvedUser.start).toLocaleString(lang);
	const completeInfo = `${availabilityInfo}`;
	const classNames = {
		base: `flex-row-reverse items-center`,
		wrapper: `items-end`,
		name: `text-end`,
		description: `text-end`
	};
	return (
		<>
		<p className={
				"text-xs"
		}>{completeInfo}</p>
		<UserAvatar classNames={classNames} user={resolvedUser}/>
		<p className={
				"text-xs"
		}>{durationInfo}</p>
		</>
	);
}

async function Image({
	imageLink,
	alt,
}: {
	imageLink: Promise<string>;
	alt: string;
}) {

	const resolvedImageLink = await imageLink;

	return (
		<>
			{resolvedImageLink ? <ImageSuspense 
				src={resolvedImageLink}
				imageHash={"L4HnpUad}t00009Z9H~C%~%24;%2"}
				alt={alt}
				width={310}
				height={207}
				/> : null}
		</>
	);
}