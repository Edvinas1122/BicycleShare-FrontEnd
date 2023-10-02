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
	
	const connectToPusher = () => {
		const pusher = new Pusher(pusherKey, {
			cluster: 'eu',
			// userAuthentication: {
			// 	endpoint: "/pusher/auth",
			// 	transport: "jsonp",
			// 	headers: { "X-CSRF-Token": "SOME_CSRF_TOKEN" },
			// },
		});
		const channel = pusher.subscribe('locker-device');
		channel.bind('pong', function(data: any) {
			console.log("Client socket got", data);
			setResponse(data.message);
		});
		pushEventMessage("ping");
		return () => {
			pusher.disconnect();
		}
	};

	React.useEffect(() => {
		const cleanup = connectToPusher();
		return cleanup;
	}, [connectToPusher]);

	return (
		<>
		{/* <Script 
			src="https://js.pusher.com/8.2.0/pusher.min.js"
			onReady={() => {connectToPusher();}}
		/> */}
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