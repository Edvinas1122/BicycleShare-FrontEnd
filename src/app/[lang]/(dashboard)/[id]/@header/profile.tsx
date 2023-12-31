"use client";
import React from "react";
import {
	User,
	Skeleton,
} from "@nextui-org/react";


// function PromiseBicycleProfile({
// 	info
// }: {
// 	info: Promise<BicycleProfileInfo>
// }) {
// 	const data = use(info);

// 	if (!data) {
// 		return null;
// 	}

// 	return (
// 		<>
// 			<Suspense fallback={
// 				<User
// 					name={data.name}
// 					className={"justify-start"}
// 				/>
// 			}>
// 				<LoadedBicycleProfile
// 					name={data.name}
// 					image={data.image}
// 				/>
// 			</Suspense>
// 		</>
// 	);
// }

import NextImage from 'next/image';

export function BicycleAvatar({
	name,
	imageLink
}: {
	name: string,
	imageLink?: string,
}
) {

	if (!imageLink) {
		return (
			<>
				<User
					name={name}
					className={"justify-start"}
				/>
			</>
		);
	}

	return (
		<>
			<User
				name={name}
				className={"justify-start"}
				avatarProps={{
					src: imageLink,
					imgProps: {
						// as: {NextImage},
						width: 30,
						height: 30,
					}
				}}
			/>
		</>
	);
}

// function LoadedBicycleProfile({
// 	name,
// 	image
// }: {
// 	name: string,
// 	image: Promise<string>,
// }) {

// 	const imageLink = use(image);

// 	return (
// 		<>
// 			<User
// 				name={name}
// 				className={"justify-start"}
// 				avatarProps={{
// 					src: imageLink,
// 					imgProps: {
// 						// as: {NextImage},
// 						width: 30,
// 						height: 30,
// 					}
// 				}}
// 			/>
// 		</>
// 	);
// }

export function UserSkeleton() {
	return (
		<>
			<div className="max-w-[300px] w-full flex items-center gap-3" style={{opacity: 0.5}}>
				<div>
					<Skeleton className="flex rounded-full w-10 h-10"/>
				</div>  
				<div className="w-full flex flex-col gap-2">
					<Skeleton className="h-3 w-2/5 rounded-lg"/>
					{/* <Skeleton className="h-3 w-4/5 rounded-lg"/> */}
				</div>
			</div>
		</>
	);
}