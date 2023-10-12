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
		presenceChannel.bind('client-open-seq-begin',
			function(data: any) {
				if (data === "begin") {
					presenceChannel.bind('client-open-seq-end', function(data: any) {
					});
					presenceChannel.bind('client-locker-button-press', function(data: any) {
						presenceChannel.bind('lend-status', function(data: any) {
							console.log("sequence complete", "data have", data);
						});
					});
				} else {
					console.log("sequence aborted", data);
				}
			}
		);
		// https://github.com/pusher/pusher-js#triggering-client-events
		presenceChannel.trigger('client-open-locker', {
			bicycle_id, duration, message: "give"
		})
		return () => {
			presenceChannel.unbind('client-locker');
			presenceChannel.unbind('client-locker-button-press');
			presenceChannel.unbind('client-open-seq-begin');
			presenceChannel.unbind('client-open-seq-end');
		}
	}

	React.useEffect(setEventDriver, [pusher]);

	return (
		<>
			{children}
		</>
	)
}