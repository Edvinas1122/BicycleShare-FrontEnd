import DashBoardFrame from "./DashBoardFrame"
import constructBicycleService from "@/components/bicycle-api/bicycle.module";
import { BicycleInfo } from "@/components/bicycle-api/content.service";
import {
	notFound
} from 'next/navigation';
import { ScrollProvider } from "./components/NavbarRef";
import { headers } from "next/headers";

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
	const className = `
		flex flex-col w-[100vw] h-[100vh] items-center justify-center`;
	const dashBoardFrameStyle = "w-full h-full items-center justify-start h-[100vh] w-[100vw] flex flex-col gap-4";

	return (
		<div className={className}>
		<ScrollProvider>
			{navbar}
			<div className={dashBoardFrameStyle}>
			<DashBoardFrame>
				{children}
				{display_ownership ? ownership : bicycles}
			</DashBoardFrame>
			</div>
		</ScrollProvider>
		</div>
	);
}
