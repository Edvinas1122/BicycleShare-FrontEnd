"use client";
import React from "react";
import {
	Spinner
} from "@nextui-org/react";
import {
	dictionaries
} from "@/conf/dictionary.conf";

import {
	Status
} from "./default"

export default function AvailabilityInfo({
	serverMethod,
}: {
	serverMethod: Function;
}) {

	const [loading, setLoading] = React.useState<boolean>(true);
	const [response, setResponse] = React.useState<string | null>(null);
	const [fadeOut, setFadeout] = React.useState<boolean>(false);

	React.useEffect(() => {
		serverMethod().then((result: Status) => {
			const status = (result === "AVAILABLE" ? 
				dictionaries.en.available : 
				dictionaries.en.unavailable);
			setResponse(status);
		});
	}, []);

	React.useEffect(() => {
		if (response) {
			setFadeout(true);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}, [response]);

	const initialClassName = `
		w-full
		flex
		flex-row
		justify-end
		text-center
		text-xs
		align-center
	`;

	return (
		<div className={"w-full flex flex-col justify-end align-center"}>
			<div className={initialClassName +
				(fadeOut ? "vertical-shrink" : "vertical-expand")
			}>
				{loading ? (
					<div className={"flex flex-row gap-2 " +
						(fadeOut ? "fade-out" : "")
					}>
						<Spinner size="sm" />
							<p className={"text-xs text-gray-500"}>
								{dictionaries.en.device_connection}
							</p>
					</div>
					) : null
				}
			</div>
		</div>
	);
}