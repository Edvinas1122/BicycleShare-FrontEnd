import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock, ReturnInteraction, refetchToken
} from "../../../Unlock";
import { headers } from "next/headers";

export default function Page({
	params: { lang, id }
}: {
	params: { lang: Language, id: string }
}) {
	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");

	const interaction: ReturnInteraction = {
		message: "return",
		bicycle_id: id,
	}

	return (
		<>
			<Unlock
				user_id={user_id}
				interaction={interaction}
				outcomeCallback={refetchToken}
			/>
		</>
	);
}
