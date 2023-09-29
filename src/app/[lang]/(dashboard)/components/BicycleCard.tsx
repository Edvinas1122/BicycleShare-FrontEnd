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
	header,
	children,
	language,
	buttons,
	action,
}: {
	props: BicycleInfo;
	header: React.ReactNode;
	children: React.ReactNode;
	language: Language;
	buttons: { label: string, route: string }[];
	action: (path: string) => void;
}) {

	const router = useRouter();

	const handler = (route: string) => {
		router.push(`/${language}/${props.lockerId}/${route}`);
		// action(`/${language}/${props.lockerId}/${route}`);
	};

	return (
		<Card className={"w-[350px] min-h-[400px] pop-appear"}>
			<CardHeader className={"h-[80px]"}>
				{header}
			</CardHeader>
			<CardBody className={"h-[200px]"} style={{
				opacity: props.available ? "100%" : "35%",
				filter: props.available ? "none" : "grayscale(50%)",
			}}>
			{children}
			</CardBody>
			<CardFooter className={"flex flex-row gap-2"}>
				{buttons.map((button, index) => (
					<Button key={index} onPress={() => handler(button.route)}>
						{button.label}
					</Button>
					// <StatefulButton key={index} action={() => handler(button.route)}>
					// 	{button.label}
					// </StatefulButton>
				))}
			</CardFooter>
			</Card>
	)
}

function StatefulButton({
	children,
	action,
}: {
	children: React.ReactNode;
	action: () => void;
}) {
	const [loading, setLoading] = React.useState(false);

	return (
		<Button
			isLoading={loading}
			onPress={() => {
				setLoading(true);
				action();
			}}
		>
			{children}
		</Button>
	);
}

export function ImageSkeleton() {
	return (
		<Skeleton className="rounded-lg" style={{borderRadius: "7px"}}>
			<div className={"h-[207px] w-[310px]"}>
			</div>
		</Skeleton>
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

export const BicycleHeader = ({
	title,
	availability,
	user,
	language,
}: {
	title: string;
	availability: boolean;
	user: UseInfo;
	language: Language;
}) => {

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
export const ImageSuspense = ({
	src,
	imageHash,
	alt,
	width,
	height,
}: {
	src: string;
	imageHash?: string;
	alt: string;
	width: number;
	height: number;
}) => {
	
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
		if (src) {
			setHashIsReady(true);
		}
	}, [setHashIsReady]);


	const blurhashStyle = 
		`absolute blurhash ${animation ? "fade-out-slow" : "fade-in-slow"}`;

	return (
		<>
			<Skeleton className="rounded-lg" isLoaded={hashIsReady}>
			<NextImage
				src={src}
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

export const UserAvatar = ({
	user,
}: {
	user: UseInfo;
}) => {

	return (
		<>
			<User
				name={user.name}
				description={user?.fullName}
				className="loader-fade-appear"
				avatarProps={{
					src: user.image.url,
					size: "md",
				}}
				/>
		</>
	);
}

export function UserSkeleton() {
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