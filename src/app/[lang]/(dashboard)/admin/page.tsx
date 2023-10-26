import {
	AdminController
} from "./AdminController";
import {
	revalidateTag
} from "next/cache";
import {
	unlock_locker, UnlockAdminDemand
} from "../[id]/select/layout";

export default function Page({
	params: {lang}
}: {
	params: {lang: string}
}) {

	async function updateCache(data: any) {
		"use server"
		revalidateTag("bicycle");
	}

	async function open_locker_admin(locker_id: string) {
		"use server";
		const request: UnlockAdminDemand = {
			purpose: "unlock_admin",
			locker_id,
		}
		const response = await unlock_locker(request);
		return response;
	}

	return (
		<>
			<AdminController
				terms={{
					admin_controller: "Admin Controller",
				}}
				methods={{
					updateCache,
					open_locker_admin,
				}}
			/>
		</>
	);
}