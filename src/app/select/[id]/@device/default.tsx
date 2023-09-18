import 
	AvailabilityInfo
from "./Availability";

export enum Status {
	OFFLINE = "OFFLINE",
	AVAILABLE = "AVAILABLE",
	UNAVAILABLE = "UNAVAILABLE",
}

export default function Page() {

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