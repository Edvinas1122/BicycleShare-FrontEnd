"use client";
import React from "react";
import {
	usePusherChannel
} from "@/app/[lang]/(dashboard)/ChannelProvider";
import
	lockerInteractSequence, {
		GiveInteraction,
		Interaction,
		OpenInteraction,
		ReturnInteraction
} from "./lockerInteraction";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export const Unlock = ({
	user_id,
	interaction,
	outcomeCallback,
}: {
	user_id: string;
	interaction: Interaction;
	outcomeCallback?: (data: any) => void;
}) => {

	const router = useRouter();
	const { channel, subscribed } = usePusherChannel();
	const [awaiting, setAwaiting] = React.useState(true);
	const [pleaseWait, setPleaseWait] = React.useState(false);

	const processStarted = () => {
		setAwaiting(false);
	}

	const outcome = async (data: any) => {
		outcomeCallback && outcomeCallback(data);
		router.replace("/");
	}

	const processing = (data: any) => {
		console.log("processing", data);
		setPleaseWait(true);
	}

	const processRefused = (data: any) => {
		console.log("process refused", data);
		router.back();
	}

	const setEventDriver = () => {
		if (!channel || !subscribed) return;
		// const interaction: GiveInteraction = {
		// 	message: "give",
		// 	bicycle_id: bicycle_id,
		// 	duration: duration,
		// }
		const cleanup = lockerInteractSequence(
			channel,
			interaction,
			user_id,
			outcome,
			processStarted,
			processing,
			processRefused,
		);
		return cleanup;
	}

	React.useEffect(setEventDriver, [channel, subscribed]);

	return (
		<>
			{
				awaiting ? <Awaiting /> : pleaseWait ? <TellToWait/> : <Started />
			}
		</>
	)
}

const Awaiting = () => {
	return (
		<div>
			<p>awaiting</p>
		</div>
	)
}

const Started = () => {
	const [timeRemaining, setTimeRemaining] = React.useState(10);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining(timeRemaining - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [timeRemaining]);

	return (
		<div>
			<p>Press the locker button</p>
			<p>time remaining: {timeRemaining}</p>
		</div>
	);
}

const TellToWait = () => {
	return (
		<div>
			<h2>Please wait</h2>
			<p>Button was pressed, please await for rent registration</p>
		</div>
	)
}

export const refetchToken = () => {
	signIn("42-school");
}

export type {Interaction, GiveInteraction, OpenInteraction, ReturnInteraction};