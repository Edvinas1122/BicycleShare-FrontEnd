import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock, RefreshMethod
} from "../../../Unlock";
import { headers, cookies } from "next/headers";
import {
	unlock_locker, SignedLockerPress, ReturnDemand, UnlockDemand
} from "../../layout";

export default async function Page({
	params: { lang, id }
}: {
	params: { lang: Language, id: string }
}) {
	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");

	async function preserve_signature(data: SignedLockerPress) {
		"use server";
		cookies().set("signature", JSON.stringify(data));
		const request: UnlockDemand = {
			purpose: "unlock",
			signed_locker_press: data,
		}
		const response = await unlock_locker(request);
		return response;
	}

	async function return_locker() {
		"use server";
		const signature_cookie = cookies().get("signature");
		if (!signature_cookie) throw new Error("No signature");
		console.log("signature", signature_cookie.value);
		const request: ReturnDemand = {
			purpose: "return",
			signed_locker_press: JSON.parse(signature_cookie.value),
		}
		const response = await unlock_locker(request);
		return response;
	}

	return (
		<>
			<Unlock
				user_id={user_id}
				locker_id={id}
				serverAction={preserve_signature}
			>
				<RefreshMethod
					method={return_locker}
					button_text={dictionaries[lang].affirmation}
				>
					<>
						<h1>{dictionaries[lang].affirmation}</h1>
						<p>{dictionaries[lang].question_key_in_locker}</p>
					</>
				</RefreshMethod>
			</Unlock>
		</>
	);
}
