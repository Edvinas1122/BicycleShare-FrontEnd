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
	user_id: number;
	bicycle_id: number;
	duration: string;
};

async function routeHandler(params: any) {
	console.log("api/locker, message received:");
	console.log(params);
	const {user_id, bicycle_id, duration} = params;
	const service
		= constructBicycleService({cache: "no-store"});
	const response
		= await service
			.registerBicycleBorrow(
				user_id,
				bicycle_id,
				duration
			);
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
			user_id,
			bicycle_id,
			duration
	});
	console.log("response", response);
	// console.log("data", timestamp);
	// console.log("user", user);

	return Respond({message: 'delivered'}, 200);
}

export const POST = BodyParameters<BorrowUpdate>([
	"user_id", "bicycle_id", "duration"
], routeHandler);