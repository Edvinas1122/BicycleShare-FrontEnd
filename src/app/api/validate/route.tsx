import { BodyParameters, Respond } from "@/components/next-api-utils/endpoints";
import * as PusherServer from "pusher";
import {
	getPusherConfig
} from "@/conf/pusher.conf";

type ValidationBody = {
	socket_id: string,
};

async function routeHandler(params: any) {
	console.log(params);
	const pusher = new PusherServer.default(getPusherConfig());
	const user = {
		id: "some_id",
		user_info: {
		  name: "John Smith",
		},
		watchlist: ['another_id_1']
	};
	const socketId = params.socket_id;
	const authResponse = pusher.authenticateUser(socketId, user);
	return Respond(authResponse, 200);
}

export const POST = BodyParameters<ValidationBody>([
	"socket_id",
], routeHandler);