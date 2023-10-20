"use client";
import React from "react";
import {
	Spinner,
	Chip
} from "@nextui-org/react";
import {
	clientDictionaries, Language, languages
} from "@/conf/dictionary.conf";
import {
	usePusherChannel
} from "@/app/[lang]/(dashboard)/ChannelProvider";
import {
	useDeviceInfo
} from "../../context";

/*
	A component to display updates on device.
	Lets consider following requirements:
		1. The component should display a message
		2. Must somehow block an parent interface
			until the message is displayed
*/
export default function AvailabilityInfo({
	lang,
}: {
	lang: Language;
}) {
	const [response, setResponse] = React.useState<string | null>(null);
	const {channel, subscribed} = usePusherChannel();

	
	// https://github.com/pusher/pusher-js#binding-to-events
	const setEventDriver = () => {
		if (!channel || !subscribed) return;
		channel.bind('client-pong', function(data: any) {
			setResponse(data.message);
		});
		const device = channel.members.get("0");
		if (!device) { setResponse("offline"); return; }
		channel.trigger('client-ping', {
			message: 'ping',
		});					
		return () => {
			channel.unbind('client-pong');
		}
	}
	
	React.useEffect(setEventDriver, [channel, subscribed]);

	const initialClassName = `
		w-full
		flex
		flex-row
		justify-end
		text-center
		text-xs
		align-center
	`;
	
	return (
		<>
		<div className={"w-full flex flex-col justify-end align-center"}>
			<div className={initialClassName
				// (fadeOut ? "vertical-shrink" : "vertical-expand")
			}>
				<Chip 
					color="primary"
					variant="faded"
					className={"text-xs"}
					endContent={
						!response && <Spinner size="sm" />
					}

				>

				{response ? (
					<StatusInfo
						status={response}
						language={lang}
					/>
				): (
					clientDictionaries[lang].loading
				)}

				</Chip>
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
					{clientDictionaries[language][status as keyof typeof clientDictionaries[Language]]}
			</>
		);
	}

	return (
		<>
				{status}
		</>
	);
}