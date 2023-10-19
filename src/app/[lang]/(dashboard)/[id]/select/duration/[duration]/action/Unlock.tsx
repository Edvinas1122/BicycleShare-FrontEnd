"use client";
import React from "react";
import {
	usePusher,
} from "../../../../PusherProvider"; // TODO: use relative path
import
	lockerInteractSequence, {GiveInteraction}
from "../../../../lockerInteraction";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export const Unlock = ({
	// children,
	user_id,
	bicycle_id,
	duration,
	lendedRedirect,
}: {
	// children: React.ReactNode;
	user_id: string;
	bicycle_id: string;
	duration: string;
	lendedRedirect: (data: any) => void;
}) => {

	const {pusher} = usePusher();
	const router = useRouter();
	const [awaiting, setAwaiting] = React.useState(true);
	const [pleaseWait, setPleaseWait] = React.useState(false);

	const processStarted = () => {
		setAwaiting(false);
	}

	const outcome = async (data: any) => {
		signIn("42-school")
		lendedRedirect(data);
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
		if (!pusher) return;
		const interaction: GiveInteraction = {
			message: "give",
			bicycle_id: bicycle_id,
			duration: duration,
		}
		const cleanup = lockerInteractSequence(
			pusher,
			interaction,
			user_id,
			outcome,
			processStarted,
			processing,
			processRefused,
		);
		return cleanup;
	}

	React.useEffect(setEventDriver, [pusher]);

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

