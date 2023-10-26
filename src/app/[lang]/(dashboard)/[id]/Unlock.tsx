"use client";
import React from "react";
import {
	usePusherChannel
} from "@/app/[lang]/(dashboard)/ChannelProvider";
import
	lockerInteractSequence
from "./lockerInteraction";
import { signIn} from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { SignedLockerPress } from "./select/layout";
import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

export const Unlock = ({
	user_id,
	locker_id,
	serverAction,
	children
}: {
	user_id: string;
	locker_id: string;
	serverAction: (request: any) => Promise<any>;
	children: React.ReactNode;
}) => {

	const router = useRouter();
	const { channel, subscribed } = usePusherChannel();
	const [awaiting, setAwaiting] = React.useState(true);
	const [pleaseWait, setPleaseWait] = React.useState(false);
	const [timedout, setTimedout] = React.useState(false);
	const [open_outcome, setOpenOutcome] = React.useState(false);

	const processStarted = () => {
		console.log("process started");
		setAwaiting(false);
	}

	const outcome = async (data: any) => {
		setOpenOutcome(true);
	}

	const serverActionHanlde = (data: SignedLockerPress) => {
		console.log("serverActionHanlde", data);
		setPleaseWait(true);
		serverAction(data).then(outcome);
	}

	const processRefused = (data: any) => {
		console.log("process refused", data);
		router.back();
	}

	const setEventDriver = () => {
		if (!channel || !subscribed) return;
		console.log("channel", channel);
		const cleanup = lockerInteractSequence(
			channel,
			user_id,
			locker_id,
			processStarted,
			serverActionHanlde,
			processRefused
		);
		return cleanup;
	}

	const timeoutBehavior = () => {
		setTimedout(true);
		setTimeout(() => {
			router.back();
		}, 1600);
	}

	React.useEffect(setEventDriver, [channel, subscribed]);

	return (
		<>
			{
				open_outcome ?
					children
					:
				timedout ? 
					<InformOf
						instruction="Timeout"
						description="You took too long to press the button"
					/>
					:
				awaiting ? 
					<Awaiting /> 
					:
				pleaseWait ? 
					<TellToWait/> 
					: 
				<Started  
					timedoutCallback={
						timeoutBehavior
					}
				/>
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

const Started = ({
	timedoutCallback,
}: {
	timedoutCallback: () => void;
}) => {
	const [timeRemaining, setTimeRemaining] = React.useState(10);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (timeRemaining  >  0) {
				setTimeRemaining(timeRemaining - 1);
			} else {
				timedoutCallback();
			}
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
		<>
			<h1>Please wait</h1>
			<p>Button was pressed, please await for rent registration</p>
		</>
	)
}

const InformOf = ( {
	instruction,
	description,
} : {
	instruction: string,
	description: string,
}) => {
	return (
		<>
			<h1>{instruction}</h1>
			<p>{description}</p>
		</>
	);
}

export const RefetchToken = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const router = useRouter();

	React.useEffect(() => {
		signIn("42-school");
		router.replace("/");
	}, []);

	return (
		<>
			{children}
		</>
	);
}

import {
	StatefulButton
} from "@/app/components/buttons";

export const RefreshMethod = ({
	children,
	method,
	button_text
}: {
	children: React.ReactNode;
	method: () => Promise<any>;
	button_text: string;
}) => {
	const [success, setSuccess] = React.useState(false);

	const onClick = () => {
		method().then((data: any) => {
			setSuccess(true);
			console.log("data", data);
			signIn("42-school");
		});
	}

	return (
		<>
			{!success ? (
				<>
					{children}
					<StatefulButton
						action={onClick}
						>
						{button_text}
					</StatefulButton>
				</>)
				: (
					<>
						<p>please stand by</p>
					</>
				)
			}

		</>
	);
}

export const ToMain = () => {
	const router = useRouter();
	React.useEffect(() => {
		router.replace("/");
	}, []);
	return null;
}