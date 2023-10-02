"use client";
import React from "react";
import {
	Spinner
} from "@nextui-org/react";
import {
	dictionaries
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
	serverMethod,
	pusherKey,
}: {
	serverMethod: Function;
	pusherKey: string;
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
		channel.bind('testing', function(data: any) {
			console.log("got", data);
			setResponse(data.message);
			
		});
		serverMethod("observe"); // 
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
					/>
				) : (
					<Spinner size="sm" />
				)}
			</div>
		</div>
		</>
	);
}

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