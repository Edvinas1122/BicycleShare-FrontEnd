import { PusherProvider } from "./PusherProvider";
import {
	getPusherConfig
} from "@/conf/pusher.conf";
import Animation from "./Animation";

export default function Layout({
	children,
	device,
}:{
	children: React.ReactNode;
	device: React.ReactNode;
}){	

	return (
		<>
			<PusherProvider
				pusherKey={getPusherConfig().key}
			>
			{device}
			<div className={
				"w-full min-h-[150px] bg-white dark:bg-gray-800"
			}>
			<Animation>
			{children}
			</Animation>
			</div>
			</PusherProvider>
		</>
	);
}