// import {
// 	QueryParameter
// } from "@/components/next-api-utils/endpoints";
// import {
// 	ValidateToken
// } from "@/components/next-api-utils/validation";
// import 
// 	constructBicycleService
// from "@/components/bicycle-api/bicycle.module";

// async function routeHandler(info: string) {
// 	const bicycleService = constructBicycleService();
// 	const res = await bicycleService.map(info);
// 	const text = JSON.stringify(res);

// 	return new Response(text, {
// 		status: 200,
// 	})
// }

// export const GET = ValidateToken("dog", 
// 	QueryParameter('content', routeHandler)
// );