import { headers } from "next/headers"
import * as PusherServer from "pusher";
import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import {
	getPusherConfig
} from "@/conf/pusher.conf";
import { revalidateTag } from 'next/cache'
import crypto from 'crypto';

export type SignedLockerPressData = {
	locker_id: string;
	timestamp: number
}

export type SignedLockerPress = {
	data: string,
	signature: string;
}

export type BorrowDemand = {
	purpose: "borrow";
	duration: string;
	signed_locker_press: SignedLockerPress;
};

export type ReturnDemand = {
	purpose: "return";
	signed_locker_press: SignedLockerPress;
};

export type UnlockDemand = {
	purpose: "unlock";
	signed_locker_press: SignedLockerPress;
}

export type UnlockAdminDemand = {
	purpose: "unlock_admin";
	locker_id: string;
};

export type OpenDemand = BorrowDemand | ReturnDemand | UnlockDemand | UnlockAdminDemand;

function getLockerID(demand: OpenDemand): string {
	switch (demand.purpose) {
		case "unlock_admin":
			return demand.locker_id;
		default:
			return JSON.parse(demand.signed_locker_press.data).locker_id;
	}
}

function handleSignatureVerification(
	demand: OpenDemand,
	pub_locker_key: string
) {
	if (demand.purpose === "unlock_admin") return true;
	const data = demand.signed_locker_press.data as string;
	const signature = demand.signed_locker_press.signature;
	const signed_data = JSON.parse(data) as SignedLockerPressData;
	const current_time = Date.now();
	const expiration_treshold = /* 2 seconds */ 1000 * 2;
	if (demand.purpose !== "return" && current_time - signed_data.timestamp > expiration_treshold) {
		return false;
	}
	return verifySignature(data, signature, pub_locker_key);
}

async function handleDatabase(
	demand: OpenDemand,
	user_id: string
) {
	"use server";
	const bicycleService = constructBicycleService();
	if (demand.purpose === "unlock_admin"
		|| demand.purpose == "unlock") return true;
	const locker_id = Number(getLockerID(demand));
	const respone = await bicycleService.update({
		purpose: demand.purpose,
		user_id: Number(user_id),
		bicycle_id: locker_id,
		duration: demand.purpose === "borrow" ? demand.duration : "",
	})
	console.log(respone);
	return respone?.object === "page";
}

export async function unlock_locker(
	demand: OpenDemand
) {
	"use server";
	const pub_locker_key = process.env.LOCKER_PUBLIC_KEY;
	if (!pub_locker_key) throw new Error("No locker public key");
	if (!handleSignatureVerification(demand, pub_locker_key)) {
		return {message: "signature verification failed"};
	}
	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	if (!user_id) throw new Error("No user id");
	const database_verification = await handleDatabase(demand, user_id);
	if (!database_verification) {
		return {message: "database failure"};
	}
	const locker_id = getLockerID(demand);
	if (demand.purpose == "borrow" || demand.purpose == "return") {
		revalidateTag(`bicycle-use-${locker_id}`);
		revalidateTag(`bicycle`);
	}
	if (demand.purpose === "return") {
		return {message: "success"};
	}
	const pusher = new PusherServer.default(getPusherConfig());
	pusher.trigger(
		"presence-locker-device",
		"unlock-command",
		{locker_id: locker_id}
	);
	return {message: "success"};
}

export default function Layout({
	children,
	device,
	take,
	return_bicycle,
}:{
	children: React.ReactNode;
	device: React.ReactNode;
	take: React.ReactNode;
	return_bicycle: React.ReactNode;
}){

	const headers_list = headers();
	const bicycle_owned = headers_list.get("x-bicycle_owned");
	const display_ownership = bicycle_owned === "null" ? false : true;

	return (
		<>
			{device}
			<div className={
				"w-full min-h-[150px] bg-white dark:bg-gray-800"
			}>
			{display_ownership ? return_bicycle : take}
			{children}
			</div>
		</>
	);
}

function verifySignature(
	data: string,
	signature: string,
	publicKey: string
) {
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();
    // Convert the Base64-encoded signature back to its original binary format
    const binarySignature = Buffer.from(signature, 'base64');
    return verify.verify(publicKey, binarySignature);
}