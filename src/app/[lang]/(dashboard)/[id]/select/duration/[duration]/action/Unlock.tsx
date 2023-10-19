"use client";
import React from "react";
import {
	usePusher,
} from "../../../../PusherProvider"; // TODO: use relative path
import
	lockerInteractSequence, {GiveInteraction}
from "../../../../lockerInteraction";

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

	const outcome = (data: any) => {
		console.log("outcome", data);
	}

	const processing = (data: any) => {
		console.log("processing", data);
	}

	const abort = (data: any) => {
		console.log("abort", data);
	}

	const setEventDriver = () => {
		if (!pusher) return;
		const interaction: GiveInteraction = {
			message: "give",
			bicycle_id: bicycle_id,
			duration: duration,
		}
		const cleanup = lockerInteractSequence(
			pusher,
			interaction,
			outcome,
			processing,
			abort,
		);
		return cleanup;
	}

	React.useEffect(setEventDriver, [pusher]);

	return (
		<>
			{children}
		</>
	)
}