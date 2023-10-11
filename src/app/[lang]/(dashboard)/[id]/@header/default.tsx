import {
	UserSkeleton, BicycleAvatar
} from "./profile";
import { Suspense } from 'react';
import { fetchBicycleProfile } from '../../layout';


async function BicycleProfile({
	id
}: {
	id: string
}) {

	const bicycleInfo: BicycleProfileInfo = await fetchBicycleProfile(id);

	return (
		<>
				<PromiseBicycleProfile
					info={bicycleInfo}
				/>
		</>
	);
}

export default function Page({
	params 
}: { 
	params: { id: string } 
}) {

	return (
		<div>
			<div className={
				"flex flex-row h-[50px] items-center"
			}>
				<Suspense fallback={
					<UserSkeleton/>
				} >
				<BicycleProfile 
					id={params.id}
				/>
				</Suspense>
			</div>
		</div>
	);
}

export type BicycleProfileInfo = {
	name: string,
	image: string,
};


async function PromiseBicycleProfile({
	info
}: {
	info: BicycleProfileInfo
}) {
	const data = await info;

	return (
		<>
			{/* <Suspense fallback={
				<BicycleAvatar
					name={data.name}
				/>
			}> */}
				<LoadedBicycleProfile
					name={data.name}
					image={data.image}
				/>
			{/* </Suspense> */}
		</>
	);
}

async function LoadedBicycleProfile({
	name,
	image
}: {
	name: string,
	image: string,
}) {

	// const imageLink = await image;

	return (
		<>
			<BicycleAvatar
				name={name}
				imageLink={image}
			/>
		</>
	);
}