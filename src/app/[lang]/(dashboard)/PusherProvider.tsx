"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';

// Create a context
type PusherContextType = {
	pusher: Pusher | null;
	connected: boolean;
}

const PusherContext = createContext<PusherContextType>({
	pusher: null,
	connected: false,
});

export const usePusher = () => {
	return useContext(PusherContext);
}

export const PusherProvider = ({
	children,
	pusherKey,
}: {
	children: React.ReactNode;
	pusherKey: string;
}) => {
	const [pusher, setPusher] = useState<Pusher | null>(null);
	const [connected, setConnected] = useState(false);

	// https://github.com/pusher/pusher-js#subscribing-to-channels
	useEffect(() => {
		const pusher = new Pusher(pusherKey, {
			cluster: 'eu',
			// @ts-ignore
			channelAuthorization: {
				endpoint: "/pusher/auth"
			} as any,
		});
		pusher.connection.bind('connected', () => {
			setConnected(true);
		});
		Pusher.log = (msg: any) => {
			console.log("Pusher log:", msg);
		};
		setPusher(pusher);
		return () => {
			pusher.disconnect();
		}
	}, []);

	return (
		<PusherContext.Provider value={{ pusher , connected }}>
			{children}
		</PusherContext.Provider>
	);
}
