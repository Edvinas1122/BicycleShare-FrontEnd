import 
	AvailabilityInfo
from "./Availability";
import * as PusherServer from "pusher";

import {
	getPusherConfig
} from "@/conf/pusher.conf";

export enum Status {
	OFFLINE = "OFFLINE",
	AVAILABLE = "AVAILABLE",
	UNAVAILABLE = "UNAVAILABLE",
}

export default function Page() {

	/*
		Dirrects subscribtion to a IOT server.
		Must keep a connection, for proventing
		on using a device when it is offline or in use.
	*/ 
	async function checkAvailability(): Promise<Status> {
		"use server";
		console.log("checkAvailability");
		const pusher = new PusherServer.default(getPusherConfig());

		return (new Promise<Status>((resolve) => {
			pusher.trigger("my-channel", "my-event", {
				message: "world"
			});
			setTimeout(() => {
				pusher.trigger("my-channel", "my-event", {
					message: "hello world"
				});
				resolve(Status.AVAILABLE);
			}, 4000);
		}));
	}

	return (
		<>
			<AvailabilityInfo
				serverMethod={checkAvailability}
				pusherKey={getPusherConfig().key}
			/>
		</>
	);
}