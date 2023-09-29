"use server";
import { Suspense } from "react";
import BicycleCard, {UserAvatar, UserSkeleton, ImageSuspense, ImageSkeleton} from "../components/BicycleCard";
import constructBicycleService from "@/components/bicycle-api/bicycle.module";
import BicycleListWrapper from "../components/BicycleWrapper";
import { BicycleInfo } from "@/components/bicycle-api/content.service";
import { Language, dictionaries } from "@/conf/dictionary.conf";

export default async function Page({params: {lang}}: {params: {lang: Language}}) {
	// const bicycleService = constructBicycleService({cache: 'no-store'});
	const bicycleService = constructBicycleService({next: {tags: ["bicycle"]}});
	const bicycles: BicycleInfo[] | null = await bicycleService.getBicycles();

	console.log("language selected", lang);
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


	const availabilityInfo = availability ? 
		dictionaries[language].returned_by :
		dictionaries[language].held_by;

	return (
		<div className={classNames}>
			<h2 className={"text-xl"}>
				{title}
			</h2>
			<div>
			<p className={
				"text-xs"
			}>{availabilityInfo}</p>
			<Suspense fallback={<UserSkeleton/>}>
				<Avatar
					user={user}
				/>
			</Suspense>
			</div>
		</div>
	);
}

async function Avatar({
	user,
}: {
	user: Promise<UseInfo | null>;
}) {

	const resolvedUser = await user;

	return (
		<>
		{resolvedUser ? <UserAvatar user={resolvedUser}/> : null}
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