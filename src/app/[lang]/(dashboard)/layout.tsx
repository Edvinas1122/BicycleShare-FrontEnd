import DashBoardFrame from "./DashBoardFrame"
import constructBicycleService from "@/components/bicycle-api/bicycle.module";
import { BicycleInfo } from "@/components/bicycle-api/content.service";
import {
	notFound
} from 'next/navigation';
import { ScrollProvider } from "./components/NavbarRef";
import { headers } from "next/headers";
import { PusherProvider } from "./PusherProvider";
import { getPusherConfig } from "@/conf/pusher.conf";
import { PusherChannelProvider } from "./ChannelProvider";

export async function generateStaticParams() {
	const bicycles = await fetchBicycles();
	return bicycles.map((bicycle) => ({
		id: bicycle.getData().lockerId.toString(),
	}));
}

export async function fetchBicycles() {
	const bicycleService = constructBicycleService({
		next: {
			tags: ["bicycle"],
			revalidate: 3600 * 12 // revalidate every 12 hours
	}});
	const bicycles: BicycleInfo[] | null = await bicycleService.getBicycles();
	return bicycles || [];
}

export type BicycleProfileInfo = {
	name: string,
	image: string,
};

export async function fetchBicycleProfile(id: string): Promise<BicycleProfileInfo> {
	const service = constructBicycleService({
		next: {
			tags: [`bicycle-${id}`],
			revalidate: 3600 * 12 // revalidate every 12 hours
	}});
	const bicycle = await service.getBicycleInterface(Number(id));
	if (!bicycle) {
		return notFound();
	}
	const bicycleInfo = {
		name: bicycle.getData().name,
		image: await bicycle.getImageLink(),
	}
	return bicycleInfo;
}

export async function getTimestamps(iteration: number, id: number) {
	"use server";
	const service = constructBicycleService({
		next: {
			tags: [`bicycle-use-${id}`],
			revalidate: 3600 * 12 // revalidate every 12 hours
	}});
	const bicycle = await service.getBicycleInterface(Number(id));
	if (!bicycle) return null;
	const timestamps = await bicycle.getLastUses(Number(iteration));
	const times = await Promise.all(timestamps);
	return times;
}

export default function Layout({
	children,
	bicycles,
	ownership,
	navbar
}: {
	children: React.ReactNode,
	bicycles: React.ReactNode,
	ownership: React.ReactNode,
	navbar: React.ReactNode,
}) {

	const headers_list = headers();
	const bicycle_owned = headers_list.get("x-bicycle_owned");
	const display_ownership = bicycle_owned === "null" ? false : true;
	const dashBoard = `
		flex flex-col gap-4 items-center justify-center my-4`;
	// const dashBoardFrameStyle = "w-full h-full items-center justify-start h-[100vh] w-[100vw] flex flex-col gap-4";

	return (
		<div className={`w-[100%] min-h-[100vh] h-[100%]`}>
			{navbar}
			<PusherProvider
				pusherKey={getPusherConfig().key}
				>
				{children}
				<section className={dashBoard}>
				<PusherChannelProvider
					channelName={"private-live-events"}
					>
					{display_ownership ? ownership : bicycles}
				</PusherChannelProvider>
				</section>
			</PusherProvider>
		</div>
	);
}
