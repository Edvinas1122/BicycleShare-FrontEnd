import { PusherProvider } from "./PusherProvider";
import {
	getPusherConfig
} from "@/conf/pusher.conf";

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
				"min-h-[150px]"
			}>
			{children}
			</div>
			</PusherProvider>
		</>
	);
}