import {
	notFound
} from 'next/navigation'
import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import {
	UserSkeleton, BicycleAvatar
} from "./profile";
import { Suspense } from 'react';


export default async function Page({
	params 
}: { 
	params: { id: string } 
}) {
	// const service = constructBicycleService({cache: 'no-store'}); // cache with bicycle tag
	const service = constructBicycleService({next: {tags: ["bicycle"]}}); // cache with bicycle tag
	const bicycle = service.getBicycleInterface(Number(params.id));
	const bicycleInfo: Promise<BicycleProfileInfo> = bicycle.then((bicycle) => {
		if (!bicycle) {
			notFound();
			throw new Error('Bicycle not found');
		}
		return {
			name: bicycle.data.Name.title[0].plain_text,
			image: bicycle.getImageLink(),
		};
	}).catch(error => ({
		name: "error",
		image: Promise.resolve("/default.png"), // error image
	}));

	return (
		<div>
			<div className={
				"flex flex-row h-[50px] items-center"
			}>
				<BicycleProfile info={bicycleInfo}/>
			</div>
		</div>
	);
}

export type BicycleProfileInfo = {
	name: string,
	image: Promise<string>,
};

function BicycleProfile({
	info
}: {
	info: Promise<BicycleProfileInfo>
}) {
	return (
		<>
			<Suspense fallback={
				<UserSkeleton/>
			}>
				<PromiseBicycleProfile
					info={info}
				/>
			</Suspense>
		</>
	);
}

async function PromiseBicycleProfile({
	info
}: {
	info: Promise<BicycleProfileInfo>
}) {
	const data = await info;

	if (!data) {
		return null;
	}

	return (
		<>
			<Suspense fallback={
				<BicycleAvatar
					name={data.name}
				/>
			}>
				<LoadedBicycleProfile
					name={data.name}
					image={data.image}
				/>
			</Suspense>
		</>
	);
}

async function LoadedBicycleProfile({
	name,
	image
}: {
	name: string,
	image: Promise<string>,
}) {

	const imageLink = await image;

	return (
		<>
			<BicycleAvatar
				name={name}
				imageLink={imageLink}
			/>
		</>
	);
}