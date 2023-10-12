"use client";
import React from "react";
import {
	usePusher,
} from "../../../PusherProvider"; // TODO: use relative path

export const Unlock = ({
	children,
	bicycle_id,
	duration,
}: {
	children: React.ReactNode;
	bicycle_id: string;
	duration: string;
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
			bicycle_id, duration, message: "give"
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