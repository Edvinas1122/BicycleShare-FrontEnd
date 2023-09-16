"use client";
import {Button} from '@nextui-org/button';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import {Image, Skeleton, User} from "@nextui-org/react";
import React, { use, Suspense } from 'react';
import { useRouter } from 'next/navigation';

interface BicycleInfo {
	lockerId: number;
	name: string;
	image: string;
	available: boolean;
}

export default function BicycleCard({
	props,
	user,
	imageLink,
}: {
	props: BicycleInfo;
	user: Promise<User>;
	imageLink: Promise<string>;
}) {

	const router = useRouter();
	const handler = () => {
		router.push(`/select/${props.lockerId}`);
	};

	const handlerLastUsers = () => {
		router.push(`/last-users/${props.lockerId}`);
	};

	return (
		<div className="">
			<Card className={"w-[350px] h-[400px]"}>
			<CardHeader>
				<BicycleHeader
					title={props.name}
					user={user}
					availability={props.available}
				/>
			</CardHeader>
			<CardBody width={300} heigt={200} style={{
				opacity: props.available ? "100%" : "35%",
				filter: props.available ? "none" : "grayscale(50%)",
			}}>
				<Suspense fallback={
					<Skeleton className="rounded-lg" style={{borderRadius: "14px"}}>
						<div style={{
							width: "300px",
							height: "200px",
							borderRadius: "40px",
						}}></div>
					</Skeleton>
				}>
					<ImageSuspense
						src={imageLink}
						alt={"Bicycle_Image_"+props.name}
						width={300}
						height={200}
					/>
				</Suspense>
			</CardBody>
			<CardFooter className={"flex flex-row gap-2"}>
				<Button
					onPress={handler}
				>Reserve</Button>
				<Button
					onPress={handlerLastUsers}
				>Last Users</Button>
			</CardFooter>
			</Card>
		</div>
	)
}

export function BicycleCardSkeleton({
	transparency
}: {
	transparency: number;
}) {

	const style = {
		opacity: transparency + "%",
	}

	return (
		<div className="bicycle-card">
			<Card style={style}>
			<CardHeader height={100}>
				<Skeleton className="rounded-lg">
					<h2 className={"text-2xl"}>title goes here</h2>
				</Skeleton>
			</CardHeader>
			<CardBody width={300} heigt={200}>
			<Skeleton className="rounded-lg">
				<Image 
						src={""}
						alt={"Bicycle_Image_"}
						width={300}
						height={200}
					/>
			</Skeleton>
			</CardBody>
			<CardFooter>
				<Skeleton className="rounded-lg">
				<Button>Text her</Button>
				</Skeleton>
			</CardFooter>
			</Card>
		</div>
	);
}

const BicycleHeader = ({
	title,
	availability,
	user,
}: {
	title: string;
	availability: boolean;
	user: Promise<User>;
}) => {

	const classNames = `
		flex
		flex-row
		justify-between
		items-center
		w-full
	`;

	const availabilityInfo = availability ?  "Returned by" : "Held by";

	return (
		<div className={classNames}>
			<h2 className={"text-xl"}
			>{title}</h2>
			<div>
			<p className={
				"text-xs"
			}>{availabilityInfo}</p>
			<Suspense fallback={<UserSkeleton/>}>
				<UserAvatar user={user}/>
			</Suspense>
			</div>
		</div>
	);
}

const ImageSuspense = ({
	src,
	alt,
	width,
	height,
}: {
	src: Promise<string>;
	alt: string;
	width: number;
	height: number;
}) => {
	
	const content = use(src);

	return (
		<>
			<Image
				src={content}
				alt={alt}
				width={width}
				height={height}
				/>
		</>
	);
}

const UserAvatar = ({
	user,
}: {
	user: Promise<User>;
}) => {
	
	const data: User = use(user);

	return (
		<>
			<User
				name={data?.name ? data.name : "not used"}
				description={data?.fullName ? data.fullName : "not used"}
				className="loader-fade-appear"
				avatarProps={{
					src: data?.image?.url,
					size: "small",
				}}
				/>
		</>
	);
}

function UserSkeleton() {
	return (
		<div className="max-w-[130px] w-full flex items-center gap-3">
			<div>
			<Skeleton className="flex rounded-full w-10 h-10"/>
			</div>  
			<div className="w-full flex flex-col gap-2">
			<Skeleton className="h-3 w-3/4 rounded-lg">
				<p>John Doee</p>
			</Skeleton>
			<Skeleton className="h-3 rounded-lg">
				<p>Johnfefd Doee</p>
			</Skeleton>
			</div>
		</div>
	);
}