import { NextResponse } from 'next/server'

export function QueryParameter<T = string>(
	query: string,
	routeHandler: (...args: any) => Promise<any>
): (request: Request) => Promise<Response>
{
	return async function (request: Request): Promise<Response> {
		const { searchParams } = new URL(request.url);
		const parameterValue = searchParams.get(query);
		if (!parameterValue) {
			return respondError(`Missing query parameter: ${query}`, 400);
		}
		return await tryRouteHandler<T>(parameterValue as T, routeHandler);
	};
}

export function BodyParameters<T = string[]>(
	bodyParameters: string[],
	routeHandler: (...args: any) => Promise<any>
): (request: Request) => Promise<Response>
{
	return async function (request: Request): Promise<Response> {
		console.log("BodyParameters");
		const body = await request.json();
		const missingParameters = bodyParameters.filter((parameter) => !(parameter in body));
		if (missingParameters.length > 0) {
			return respondError(`Missing body parameters: ${missingParameters.join(", ")}`, 400);
		}
		return await tryRouteHandler<T>(body, routeHandler);
	};
}

async function tryRouteHandler<T>(parameter: T, routeHandler: Function): Promise<Response> {
	try {
		return await routeHandler(parameter);
	} catch (error: any) {
		console.log("error", error.message);
		return respondError(error.message, 400);
	}
}

export function respondError(message: string, status: number) {
	return NextResponse.json({
		sucess: false,
		error: "validation failure",
		message: message,
	}, { status });
}

export function respondSetCookies(user: any, token: string, status: number) {
	return new Response(
		JSON.stringify(user),
		{
			status: status,
			headers: {
				'Set-Cookie': `token=${token}; HttpOnly; Path=/; SameSite=Strict;`,
				'Location': '/',
			},
		}
	);
}

export function Respond(body: any, status: number) {
	return new Response(
		JSON.stringify(body),
		{
			status: status,
		}
	);
}