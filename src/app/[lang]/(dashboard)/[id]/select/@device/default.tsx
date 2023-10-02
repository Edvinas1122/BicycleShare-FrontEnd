import 
	AvailabilityInfo
from "./Availability";
import * as PusherServer from "pusher";

import {
	getPusherConfig
} from "@/conf/pusher.conf";

import {
	Language
} from "@/conf/dictionary.conf";
import { getUserFromHeaders } from "@/components/next-api-utils/validation";

export enum Status {
	OFFLINE = "OFFLINE",
	AVAILABLE = "AVAILABLE",
	UNAVAILABLE = "UNAVAILABLE",
}

export default function Page({
	params: {lang, id},
}: {
	params: {lang: Language, id: string};
}) {

	const user = getUserFromHeaders();
	/*
		Dirrects subscribtion to a IOT server.
		Must keep a connection, for proventing
		on using a device when it is offline or in use.
	*/ 
	async function checkAvailability(
		eventName: string,
		message?: string,
	): Promise<void> {
		"use server";
		console.log("Server checkAvailability");
		const pusher = new PusherServer.default(getPusherConfig());
		pusher.trigger("locker-device", eventName, {
			message: {
				bicycle_id: id,
				lang: lang,
				username: user.username,
				info: message,
			}
		});
	}

	return (
		<>
			<AvailabilityInfo
				pushEventMessage={checkAvailability}
				pusherKey={getPusherConfig().key}
				lang={lang}
			/>
		</>
	);
}