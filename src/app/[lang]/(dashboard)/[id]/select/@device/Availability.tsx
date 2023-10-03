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
		
		
		React.useEffect(() => {
			const connectToPusher = async () => {
			const pusher = new Pusher(pusherKey, {
				cluster: 'eu',
				// @ts-ignore
				channelAuthorization: {
					endpoint: "/pusher/auth",
					// transport: "jsonp",
				} as any,
		
				// userAuthentication: {
				// 	endpoint: "/pusher/auth",
				// 	transport: "jsonp",
				// 	headers: { "X-CSRF-Token": "SOME_CSRF_TOKEN" },
				// },
			});
			Pusher.log = (msg: any) => {
				console.log("Pusher log:", msg);
			};
			pusher.connection.bind('connected', function() {
				const channel = pusher.subscribe('locker-device');
				// channel.bind('pong', function(data: any) {
				// 	console.log("Client socket got", data);
				// });
				channel.bind('pusher:subscription_succeeded', function(data: any) {
					const presenceChannel = pusher.subscribe('presence-locker-device');
					presenceChannel.bind('pusher:subscription_succeeded', function(members: any) {
						console.log("Client socket got", members);
						presenceChannel.trigger('client-ping', {
							message: "ping",
						});
					});
					presenceChannel.bind('client-ping', function(data: any) {
						console.log("Client socket got", data);
						// presenceChannel.trigger('client-ping', {
						// 	message: "pong",
						// });
					});

					// setTimeout(() => {
					// 	// pushEventMessage("ping", "online");
					// 	channel.trigger('client-ping', {
					// 		message: "test",
					// 	});
					// }, 10);
				});

			});
			return async () => {
				// cleanup
				console.log("Client socket unsubscribed from channel");
				await pusher.unsubscribe('locker-device');
			}
		};
		let cleanupFunc: (() => void) | undefined;
		connectToPusher().then((cleanup) => {
			cleanupFunc = cleanup;
		});
	
		return () => {
			console.log("Cleaning up");
			if (cleanupFunc) {
				cleanupFunc();
			}
		};
	}, [pusherKey]);

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