import {
	BodyParameters,
	Respond
} from "@/components/next-api-utils/endpoints";
import {
	getPusherConfig
} from "@/conf/pusher.conf";
import * as PusherServer from "pusher";


type PushMessage = {
	event: string;
	message: string;
};

async function routeHandler(params: any) {
	const pusher = new PusherServer.default(getPusherConfig());
	const {event, message} = params;
	pusher.trigger("locker-device", event, {
		message: message
	});
	return Respond({message: 'delivered'}, 200);
}

export const POST = BodyParameters<PushMessage>([
	"event", "message"
], routeHandler);