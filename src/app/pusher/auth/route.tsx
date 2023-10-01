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
};

async function routeHandler(params: any) {
	console.log(params);
	const user = getUserFromHeaders();
	if (!user.id || !user.name) return Respond({message: 'not authorized'}, 403);
	const pusherUser = {
		id: user.id,
		user_info: {
			name: user.name,
		},
		watchlist: ['another_id_1']
	}
	console.log(user);
	const socketId = params.socket_id;
	const pusher = new PusherServer.default(getPusherConfig());
	const authResponse = pusher.authenticateUser(socketId, pusherUser);
	console.log(authResponse);
	return new Response(JSON.stringify(authResponse), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		}
	});
}

export const POST = BodyParameters<ValidationBody>([
	"socket_id",
], routeHandler);