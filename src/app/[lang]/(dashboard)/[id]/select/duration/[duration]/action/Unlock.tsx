"use client";
import React from "react";
import {
	usePusher,
} from "../../../PusherProvider"; // TODO: use relative path

export const Unlock = ({
	children,
	// message,
}: {
	children: React.ReactNode;
	// message: any;
}) => {

	const {pusher} = usePusher();

	// https://github.com/pusher/pusher-js#accessing-channels
	const setEventDriver = () => {
		if (!pusher) return;
		const presenceChannel = pusher.channel("presence-locker-device")
		presenceChannel.bind('client-locker', function(data: any) {
				console.log("client-locker", data);
			}
		);
		// https://github.com/pusher/pusher-js#triggering-client-events
		presenceChannel.trigger('client-open-locker', {
			message: 'request-unlock',
		})
		return () => {
			presenceChannel.unbind('client-locker');
		}
	}

	React.useEffect(setEventDriver, [pusher]);

	return (
		<>
			{children}
		</>
	)
}