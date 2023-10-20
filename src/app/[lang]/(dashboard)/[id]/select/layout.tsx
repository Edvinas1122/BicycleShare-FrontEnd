import { PusherProvider } from "../../PusherProvider";
import {
	getPusherConfig
} from "@/conf/pusher.conf";
import Animation from "../Animation";
import { headers } from "next/headers"

export default function Layout({
	children,
	device,
	take,
	return_bicycle,
}:{
	children: React.ReactNode;
	device: React.ReactNode;
	take: React.ReactNode;
	return_bicycle: React.ReactNode;
}){

	const headers_list = headers();
	const bicycle_owned = headers_list.get("x-bicycle_owned");
	const display_ownership = bicycle_owned === "null" ? false : true;

	/*
		We attempt to migrate the Pusher provider to global scope.
		Here we try to use the channel provider instead.
	*/
	return (
		<>
			{/* <PusherProvider
				pusherKey={getPusherConfig().key}
			> */}
			{device}
			<div className={
				"w-full min-h-[150px] bg-white dark:bg-gray-800"
			}>
			{display_ownership ? return_bicycle : take}
			{children}
			</div>
			{/* </PusherProvider> */}
		</>
	);
}