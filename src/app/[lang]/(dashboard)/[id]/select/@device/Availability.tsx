"use client";
import React from "react";
import {
	Spinner
} from "@nextui-org/react";
import {
	clientDictionaries, Language, languages
} from "@/conf/dictionary.conf";

// import Script from 'next/script'
import Pusher from 'pusher-js'

/*
	A component to display updates on device.
	Lets consider following requirements:
		1. The component should display a message
		2. Must somehow block an parent interface
			until the message is displayed
*/
// declare var Pusher: any;

export default function AvailabilityInfo({
	pushEventMessage,
	pusherKey,
	lang,
}: {
	pushEventMessage: Function;
	pusherKey: string;
	lang: Language;
}) {

	const [response, setResponse] = React.useState<string | null>(null);
	const [fadeOut, setFadeout] = React.useState<boolean>(false);

	const initialClassName = `
		w-full
		flex
		flex-row
		justify-end
		text-center
		text-xs
		align-center
		`;
		
	const setEventDriver = () => {
		const pusher = new Pusher(pusherKey, {
			cluster: 'eu',
			// @ts-ignore
			channelAuthorization: {
				endpoint: "/pusher/auth",
				// transport: "jsonp",
			} as any,
		});
		Pusher.log = (msg: any) => {
			console.log("Pusher log:", msg);
		};
		pusher.connection.bind('connected', function() {
			const presenceChannel = pusher.subscribe('presence-locker-device');
			presenceChannel.bind('pusher:subscription_succeeded', function(members: any) {
				const device = members.get("0");
				console.log("Client socket got", device);
				device ? setResponse("online") : setResponse("offline");
			});
			presenceChannel.bind('pusher:member_added', function(member: any) {
				const device = member.info;
				device.id == "0" ? setResponse("online") : setResponse("offline");
			});
			presenceChannel.bind('pusher:member_removed', function(member: any) {
				const device = member.info;
				device.id == "0" ? setResponse("offline") : setResponse("online");
			});
			presenceChannel.bind('client-pong', function(data: any) {
				console.log("Client socket got", data);
				setResponse(data.message);
			});
		});

		return () => {
			pusher.disconnect();
		};
	}

	React.useEffect(setEventDriver, [pusherKey]);

	return (
		<>
		<div className={"w-full flex flex-col justify-end align-center"}>
			<div className={initialClassName +
				(fadeOut ? "vertical-shrink" : "vertical-expand")
			}>
				{response ? (
					<StatusInfo
						status={response}
						language={lang}
					/>
				) : (
					<Spinner size="sm" />
				)}
			</div>
		</div>
		</>
	);
}

export enum LockerMessages {
	online = 'online',
}

function StatusInfo({
	status,
	language,
}: {
	status: string;
	language: Language;
}) {

	if (clientDictionaries[language][status as keyof typeof clientDictionaries[Language]]) {
		return (
			<>
				<p className={"text-xs text-green-500"}>
					{clientDictionaries[language][status as keyof typeof clientDictionaries[Language]]}
				</p>
			</>
		);
	}

	return (
		<>
			<p className={"text-xs text-gray-500"}>
				{status}
			</p>
		</>
	);
}