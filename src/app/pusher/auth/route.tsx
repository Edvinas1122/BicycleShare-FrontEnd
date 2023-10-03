import { BodyParameters, Respond } from "@/components/next-api-utils/endpoints";
import * as PusherServer from "pusher";
import {
	getPusherConfig
} from "@/conf/pusher.conf";
import {
	getUserFromHeaders
} from "@/components/next-api-utils/validation";

type ValidationBody = {
	socket_id: string,
	channel_name: string,
};

/*
	https://pusher.com/docs/channels/server_api/authorizing-users/#implementing-the-authorization-endpoint-for-a-presence-channel
*/
async function routeHandler(params: any) {
	console.log("API, pusher authorization request received:");
	console.log(params);
	const user = getUserFromHeaders();
	if (!user.id || !user.name) return Respond({message: 'not authorized'}, 403);
	const presenceData = {
		user_id: user.id,
		user_info: {
			name: user.name,
		},
	};
	const socketId = params.socket_id;
	const channelName = params.channel_name;
	const pusher = new PusherServer.default(getPusherConfig());
	const authResponse = pusher.authorizeChannel(socketId, channelName, presenceData);
	console.log("API, pusher authorization response:");
	console.log(authResponse);
	return new Response(JSON.stringify(authResponse), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		}
	});
}

export const POST = BodyParameters<ValidationBody>([
	"socket_id", "channel_name"
], routeHandler);