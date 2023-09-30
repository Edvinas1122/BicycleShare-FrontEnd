"use client";
import React from "react";
import {
	Spinner
} from "@nextui-org/react";
import {
	dictionaries
} from "@/conf/dictionary.conf";
import {
	Status
} from "./default"
import Script from 'next/script'

/*
	A component to display updates on device.
	Lets consider following requirements:
		1. The component should display a message
		2. Must somehow block an parent interface
			until the message is displayed
*/
declare var Pusher: any;

export default function AvailabilityInfo({
	serverMethod,
	pusherKey,
}: {
	serverMethod: Function;
	pusherKey: string;
}) {

	const [loading, setLoading] = React.useState<boolean>(true);
	const [response, setResponse] = React.useState<string | null>(null);
	const [fadeOut, setFadeout] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (response) {
			// setFadeout(true);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, [response]);

	const initialClassName = `
		w-full
		flex
		flex-row
		justify-end
		text-center
		text-xs
		align-center
	`;
	
	const connectToPusher = async () => {
		var pusher = new Pusher(pusherKey, {
			cluster: 'eu',
		});
		const channel = pusher.subscribe('my-channel');
		channel.bind('my-event', function(data: any) {
			// alert(JSON.stringify(data));
			setResponse(data.message);
			
		});
		const sends = setInterval(() => {
			serverMethod();
		}, 6000);
		return () => {
			pusher.disconnect();
			clearInterval(sends);
		}
	};

	return (
		<>
		<Script 
			src="https://js.pusher.com/8.2.0/pusher.min.js"
			onReady={() => {connectToPusher();}}
		/>
		<div className={"w-full flex flex-col justify-end align-center"}>
			<div className={initialClassName +
				(fadeOut ? "vertical-shrink" : "vertical-expand")
			}>
				{response ? (
					<StatusInfo
						status={response}
					/>
				) : (
					<Spinner size="sm" />
				)}
				{/* {loading ? (
					<div className={"flex flex-row gap-2 " +
					(fadeOut ? "fade-out" : "")
				}>
						<Spinner size="sm" />
							<p className={"text-xs text-gray-500"}>
								{dictionaries.en.device_connection}
							</p>
					</div>
					) : null
				} */}
			</div>
		</div>
		</>
	);
}

// enum DeviceMessages {
// 	AVAILABLE,
// 	UNAVAILABLE,
// 	IN_USE,
// 	PAIRED,
// 	PROCEDURE_COMPLETED,
// }

// function ConnectionMessagesDisplay({

// })

function StatusInfo({
	status,
}: {
	status: string;
}) {
	return (
		<>
			<p className={"text-xs text-gray-500"}>
				{status}
			</p>
		</>
	);
}