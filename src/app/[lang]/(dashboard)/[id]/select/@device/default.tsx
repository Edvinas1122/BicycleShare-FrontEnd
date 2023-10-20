import 
	AvailabilityInfo
from "./Availability";
import {
	Language
} from "@/conf/dictionary.conf";

export enum Status {
	OFFLINE = "OFFLINE",
	AVAILABLE = "AVAILABLE",
	UNAVAILABLE = "UNAVAILABLE",
}

export default async function Page({
	params: {lang, id},
}: {
	params: {lang: Language, id: string};
}) {

	return (
		<>
			<AvailabilityInfo
				lang={lang}
			/>
		</>
	);
}