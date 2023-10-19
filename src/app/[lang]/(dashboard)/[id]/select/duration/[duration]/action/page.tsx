import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock
} from "./Unlock";
import { redirect, RedirectType } from "next/navigation";
import { headers } from "next/headers";

async function lendedRedirect(data: any) {
	"use server";
	redirect("/");
}

export default async function Page({
	params: { lang, id, duration }
}: {
	params: { lang: Language, duration: string, id: string }
}) {

	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");

	return (
		<Unlock
			user_id={user_id}
			bicycle_id={id}
			duration={duration}
			lendedRedirect={lendedRedirect}
		/>
	);
}