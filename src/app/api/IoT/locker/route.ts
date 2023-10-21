import {
	BodyParameters,
	Respond
} from "@/components/next-api-utils/endpoints";
import {
	getPusherConfig
} from "@/conf/pusher.conf";
import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import * as PusherServer from "pusher";
import { revalidateTag } from 'next/cache'

type BorrowUpdate = {
	purpose: "borrow";
	user_id: number;
	bicycle_id: number;
	duration: string;
};

type ReturnUpdate = {
	purpose: "return";
	user_id: number;
	bicycle_id: number;
};

type Update = BorrowUpdate | ReturnUpdate;

async function routeHandler(params: any) {
	console.log("api/locker, message received:");
	console.log(params);
	const {purpose, bicycle_id} = params;
	const service
		= constructBicycleService({cache: "no-store"});
	const response = await service.update(params);
	revalidateTag(`bicycle-use-${bicycle_id}`);
	revalidateTag(`bicycle`);
	const pusher
		= new PusherServer
			.default(getPusherConfig());
	pusher.trigger(
		"presence-locker-device",
		"lend-status",
		{
			registred: true,
	});
	console.log("response", response);
	// console.log("data", timestamp);
	// console.log("user", user);

	return Respond({message: 'delivered'}, 200);
}

export const POST = BodyParameters<Update>([
	"user_id", "bicycle_id", "purpose"
], routeHandler);