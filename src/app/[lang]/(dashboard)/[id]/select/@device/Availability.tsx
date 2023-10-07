"use client";
import React from "react";
import {
	Spinner
} from "@nextui-org/react";
import {
	clientDictionaries, Language, languages
} from "@/conf/dictionary.conf";
import {
	usePusher
} from "../PusherProvider";
// import Script from 'next/script'
// import Pusher from 'pusher-js'

/*
	A component to display updates on device.
	Lets consider following requirements:
		1. The component should display a message
		2. Must somehow block an parent interface
			until the message is displayed
*/
export default function AvailabilityInfo({
	// pushEventMessage,
	pusherKey,
	lang,
}: {
	// pushEventMessage: Function;
	pusherKey: string;
	lang: Language;
}) {
	const [response, setResponse] = React.useState<string | null>(null);
	const [fadeOut, setFadeout] = React.useState<boolean>(false);
	const { pusher } = usePusher();

	const initialClassName = `
		w-full
		flex
		flex-row
		justify-end
		text-center
		text-xs
		align-center
	`;
	
	// https://github.com/pusher/pusher-js#binding-to-events
	const setEventDriver = () => {
		if (!pusher) return;
		let presenceChannel: any;
		pusher.connection.bind('connected', function() {
			presenceChannel = pusher.subscribe('presence-locker-device');
			presenceChannel.bind('pusher:subscription_succeeded', function(members: any) {
				const device = members.get("0");
				if (!device) { setResponse("offline"); return; }
				presenceChannel.trigger('client-ping', {
					message: 'ping',
				});					
			});
			presenceChannel.bind('client-pong', function(data: any) {
				setResponse(data.message);
			});
		});
		return () => {
			presenceChannel.unbind('client-pong');
		}
	}

	React.useEffect(setEventDriver, [pusher]);

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