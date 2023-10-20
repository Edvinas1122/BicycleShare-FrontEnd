"use client";
import React from "react";
import { usePusher } from "./PusherProvider";

type PusherChannelContextType = {
	channel: any | null;
	subscribed: boolean;
}

const PusherChannelContext
	= React.createContext<PusherChannelContextType>({
		channel: null,
		subscribed: false,
	});

export const usePusherChannel = () => {
	return React.useContext(PusherChannelContext);
}

export const PusherChannelProvider = ({
	channelName,
	children,
}: {
	channelName: string;
	children: React.ReactNode;
}) => {
	const { pusher, connected } = usePusher();
	const [channel, setChannel] = React.useState<any | null>(null);
	const [subscribed, setSubscribed] = React.useState(false);

	// https://github.com/pusher/pusher-js#subscribing-to-channels
	React.useEffect(() => {
		if (!pusher || !connected) return;
		const channel = pusher.subscribe(channelName);
		channel.bind('pusher:subscription_succeeded', () => {
			setSubscribed(true);
		});
		setChannel(channel);
		return () => {
			channel.unsubscribe();
		}
	}, [pusher, connected, channelName]);

	return (
		<PusherChannelContext.Provider value={{ channel, subscribed }}>
			{children}
		</PusherChannelContext.Provider>
	);
}