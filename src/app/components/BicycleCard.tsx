"use client";
import {Button} from '@nextui-org/button';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import {Image, Skeleton, User} from "@nextui-org/react";
import React, { use, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {
	dictionaries,
	Language,
} from '@/conf/dictionary.conf';
import { Blurhash } from "react-blurhash";

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
	language,
}: {
	props: BicycleInfo;
	user: Promise<UseInfo | null>;
	imageLink: Promise<string>;
	language: Language;
}) {

	const router = useRouter();
	const handler = () => {
		router.push(`/select/${props.lockerId}`);
	};

	const handlerLastUsers = () => {
		router.push(`/last-users/${props.lockerId}`);
	};

	return (
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
					<Skeleton className="rounded-lg" style={{borderRadius: "7px"}}>
						<div className={"h-[207px] w-[310px]"}>
						</div>
					</Skeleton>
				}>
					<ImageSuspense
						src={imageLink}
						imageHash={"L4HnpUad}t00009Z9H~C%~%24;%2"}
						alt={"Bicycle_Image_"+props.name}
						width={310}
						height={207}
					/>
				</Suspense>
			</CardBody>
			<CardFooter className={"flex flex-row gap-2"}>
				<Button
					onPress={handler}
				>{dictionaries[language].reserve}</Button>
				<Button
					onPress={handlerLastUsers}
				>{dictionaries[language].last_users}</Button>
			</CardFooter>
			</Card>
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
			<Card style={style} className={"w-[350px] h-[400px]"}>
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

import NextImage from 'next/image'; // I dunno why it loads so badly


/*
	Resolves promise of an image link,
	then displays blurhash until image is loaded

	but when mounted, it will display skeleton until
	blurhash is ready
*/
const ImageSuspense = ({
	src,
	imageHash,
	alt,
	width,
	height,
}: {
	src: Promise<string>;
	imageHash?: string;
	alt: string;
	width: number;
	height: number;
}) => {
	
	const content = use(src);
	const [imageLoaded, setImageLoaded] = React.useState(false);
	const [animation, setAnimation] = React.useState(false);
	const [hashIsReady, setHashIsReady] = React.useState(false);
	const swithState = () => {
		setAnimation(true);
		setTimeout(() => {
			setImageLoaded(true);
		}, 1000);
	}

	React.useEffect(() => {
		if (content) {
			setHashIsReady(true);
		}
	}, [setHashIsReady]);


	const blurhashStyle = 
		`absolute blurhash ${animation ? "fade-out-slow" : "fade-in-slow"}`;

	return (
		<>
			<Skeleton className="rounded-lg" isLoaded={hashIsReady}>
			<NextImage
				src={content}
				width={width}
				height={height}
				alt={alt}
				className={"rounded-lg"}
				onLoadingComplete={swithState}
				/>
			</Skeleton>
			{!imageLoaded && imageHash && (
				<div className={blurhashStyle}>
					<Blurhash
						hash={imageHash}
						width={width}
						height={height}
						resolutionX={32}
						resolutionY={32}
						punch={1}
					/>
				</div>
			)}
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