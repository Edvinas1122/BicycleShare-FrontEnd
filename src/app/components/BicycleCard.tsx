"use client";
import {Button} from '@nextui-org/button';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import {Image, Skeleton, User} from "@nextui-org/react";
import React, { use, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
	dictionaries,
} from '@/conf/dictionary.conf';

interface BicycleInfo {
	lockerId: number;
	name: string;
	available: boolean;
}

type UseInfo = {
	id: string;
	name: string;
	fullName: string;
	image: {url:string}
	start: number;
	end: number;
}

export default function BicycleCard({
	props,
	user,
	imageLink,
}: {
	props: BicycleInfo;
	user: Promise<UseInfo | null>;
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
			<CardHeader className={"h-[80px]"}>
				<BicycleHeader
					title={props.name}
					user={user}
					availability={props.available}
				/>
			</CardHeader>
			<CardBody className={"h-[200px]"} style={{
				opacity: props.available ? "100%" : "35%",
				filter: props.available ? "none" : "grayscale(50%)",
			}}>
				<Suspense fallback={
					<Skeleton className="rounded-lg" style={{borderRadius: "14px"}}>
						<div className={"h-[200px] w-[320px]"}>
						</div>
					</Skeleton>
				}>
					<ImageSuspense
						src={imageLink}
						alt={"Bicycle_Image_"+props.name}
						width={320}
						height={200}
					/>
				</Suspense>
			</CardBody>
			<CardFooter className={"flex flex-row gap-2"}>
				<Button
					onPress={handler}
				>{dictionaries.en.reserve}</Button>
				<Button
					onPress={handlerLastUsers}
				>{dictionaries.en.last_users}</Button>
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
			<CardHeader className={"h-[80px]"}>
				<Skeleton className="rounded-lg">
					<h2 className={"text-2xl"}>title goes here</h2>
				</Skeleton>
			</CardHeader>
			<CardBody className={"h-[200px]"}>
			<Skeleton className="rounded-lg">
				<div style={{
					width: "320px",
					height: "400px"
				}}></div>
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
	user: Promise<UseInfo | null>;
}) => {

	const classNames = `
		flex
		flex-row
		justify-between
		items-center
		w-full
	`;

	const availabilityInfo = availability ? 
		dictionaries.en.returned_by :
		dictionaries.en.held_by;

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

import NextImage from 'next/image';

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
			<NextImage
				src={content}
				width={width}
				height={height}
				alt={alt}
				className={"rounded-lg"}
				placeholder="blur"
			/>
			{/* <Image
				src={content}
				width={width}
				isBlurred={true}
				radius="lg"
				disableSkeleton={true}
				/> */}
		</>
	);
}

const UserAvatar = ({
	user,
}: {
	user: Promise<UseInfo | null>;
}) => {
	
	const data: UseInfo | null = use(user);

	if (!data) {
		return null;
	}

	return (
		<>
			<User
				name={data.name}
				description={data?.fullName}
				className="loader-fade-appear"
				avatarProps={{
					src: data.image.url,
					size: "md",
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