import { BodyParameters, Respond } from "@/components/next-api-utils/endpoints";

type ValidationBody = {
	socketId: string,
};


async function routeHandler(params: any) {
	console.log(params);
	return Respond({message: "ok"}, 200);
}

export const POST = BodyParameters<ValidationBody>([
	"socketId",
], routeHandler);