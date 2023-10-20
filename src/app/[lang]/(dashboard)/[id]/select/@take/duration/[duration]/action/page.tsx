import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock, refetchToken, GiveInteraction
} from "../../../../../Unlock";
import { headers } from "next/headers";

export default async function Page({
	params: { lang, id, duration }
}: {
	params: { lang: Language, duration: string, id: string }
}) {

	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");

	const interaction: GiveInteraction = {
		message: "give",
		bicycle_id: id,
		duration: duration,
	}

	return (
		<Unlock
			user_id={user_id}
			interaction={interaction}
			outcomeCallback={refetchToken}
		/>
	);
}