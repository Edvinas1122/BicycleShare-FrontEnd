import { Suspense } from "react";
import BicycleCard, {
	UserAvatar,
	UserSkeleton,
	ImageSuspense,
	ImageSkeleton,
	LinkButton
} from "../components/BicycleCard";
import { Language, dictionaries } from "@/conf/dictionary.conf";
import { redirect, RedirectType } from "next/navigation";
import { fetchBicycles } from "../layout";


export default async function Page({params: {lang}}: {params: {lang: Language}}) {
	const bicycles = await fetchBicycles();

	const buttons = [
		{
			label: dictionaries[lang].reserve,
			route: `/select`,
		},
		{
			label: dictionaries[lang].last_users,
			route: `/last-users`,
		},
	];

	if (!bicycles) {
		return null;
	}

	return (
		<>
		{
			bicycles.map((bicycle, index) => (
				<SingleBicycleCard
					key={index}
					lang={lang}
					bicycle={bicycle}
					buttons={buttons}
				/>
			))
		}
		</>
	);
}

function SingleBicycleCard({
	lang, 
	bicycle,
	buttons
}: {
	lang: Language,
	bicycle: any,
	buttons: any
}) {
	return (
		<BicycleCard
			// key={bicycle.getData().id}
			props={bicycle.getData()}
			header={
				<BicycleHeader
					title={bicycle.getName()}
					availability={bicycle.getData().available}
					user={bicycle.getLastUse()}
					language={lang}
				/>
			}
			language={lang}
			footer={
				<>
					<Buttons
						buttons={buttons}
						lang={lang}
						id={bicycle.getData().lockerId.toString()}
					/>
				</>
			}
		>
			<Suspense fallback={<ImageSkeleton/>}>
				<Image
					imageLink={bicycle.getImageLink()}
					alt={bicycle.getName()}
				/>
			</Suspense>
		</BicycleCard>
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

function Buttons({
	buttons,
	id,
	lang,
}: {
	buttons: { label: string, route: string }[];
	id: string;
	lang: Language;
}) {

	const prefix = `/${lang}/${id}`;

	return (
		<>
			{buttons.map((button) => (
				<LinkButton
					key={button.label}
					label={button.label}
					route={prefix + button.route}
				/>
			))}
		</>
	);
}