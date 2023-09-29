import 
	AvailabilityInfo
from "./Availability";

export enum Status {
	OFFLINE = "OFFLINE",
	AVAILABLE = "AVAILABLE",
	UNAVAILABLE = "UNAVAILABLE",
}

export default async function Page() {

	/*
		Dirrects subscribtion to a IOT server.
		Must keep a connection, for proventing
		on using a device when it is offline or in use.
	*/ 
	async function checkAvailability(): Promise<Status> {
		"use server";
		return new Promise<Status>((resolve) => {
			setTimeout(() => {
					resolve(Status.AVAILABLE);
			}, 1000);
		});
	}

	return (
		<>
			<AvailabilityInfo
				serverMethod={checkAvailability}
			/>
		</>
	);
}