import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock, ToMain
} from "../../../Unlock";
import { headers } from "next/headers";
import {
	unlock_locker, SignedLockerPress, UnlockDemand
} from "../../layout";

async function unlockButtonPressed() {
	"use server";
	console.log("unlock button pressed");
}

export default function Page({
	params: { lang, id }
}: {
	params: { lang: Language, id: string }
}) {
	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");

	async function open_locker(data: SignedLockerPress) {
		"use server";
		const request: UnlockDemand = {
			purpose: "unlock",
			signed_locker_press: data,
		}
		const response = await unlock_locker(request);
		return response;
	}

	return (
		<>
			<Unlock
				user_id={user_id}
				locker_id={id}
				serverAction={open_locker}
			>
				<ToMain/>
			</Unlock>
		</>
	);
}
