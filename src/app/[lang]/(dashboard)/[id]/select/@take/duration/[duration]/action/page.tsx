import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock, RefetchToken
} from "../../../../../Unlock";
import { headers } from "next/headers";
import {
	unlock_locker, SignedLockerPress, BorrowDemand
} from "../../../../layout";

export async function generateStaticParams() {
	return [{ duration: 'short' }, { duration: 'hours' }, { duration: 'long' }, { duration: 'night' }]
}

export const dynamicParams = false;


export default async function Page({
	params: { lang, id, duration }
}: {
	params: { lang: Language, duration: string, id: string }
}) {

	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");

	async function give_locker(data: SignedLockerPress) {
		"use server";
		const request: BorrowDemand = {
			purpose: "borrow",
			signed_locker_press: data,
			duration: duration,
		}
		const response = await unlock_locker(request);
		return response;
	}

	return (
		<Unlock
			user_id={user_id}
			locker_id={id}
			serverAction={give_locker}
		>
			<RefetchToken
			>
				<p>Please stand by</p>
			</RefetchToken>
		</Unlock>
	);
}