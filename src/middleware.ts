import { NextResponse, NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import { Token } from "@/components/next-api-utils/validation";
import Negotiator from 'negotiator'
import { Language } from './conf/dictionary.conf';

const localesToPaths: {[key:string]: Language} = {
	'en-US': 'en',
	// 'nl-NL': 'nl',
	// 'nl': 'nl',
	'de-DE': 'de',
	'ue-UE': 'ue',
}

function getLocale(request: NextRequest): Language { 
	const headers = Object.fromEntries(request.headers.entries());
	const languages = new Negotiator({ headers }).languages()
	const locales = Object.keys(localesToPaths);
	const defaultLocale = 'en-US'
	const lang = languages && languages[0] !== '*' ? match(languages, locales, defaultLocale) : defaultLocale;
	const locale = localesToPaths[lang as keyof typeof localesToPaths]
	return locale;
}

function getRedirectUrl(locale: string, pathname: string, origin: string, href: string) {
	const redirectUrl = new URL(`/${locale}${pathname}`, origin);
	const params = new URL(href).searchParams;
	const allParams = Object.fromEntries(params.entries());
	for (const [key, value] of Object.entries(allParams)) {
		redirectUrl.searchParams.append(key, value as string);
	}
	return redirectUrl;
}

function pathnameIsMissingLocale(
	pathname: string,
	localesToPaths: any,
	exceptedFromLocale: string[] = []
) {
	const segments = pathname.split("/").filter(Boolean);
	console.log("segments", segments);
	if (segments.some(segment => exceptedFromLocale.includes(segment))) return false;
	// console.log("not excepted from locale", pathname);
	const pathnameIsMissingLocale = Object.values(localesToPaths).every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);
	return pathnameIsMissingLocale;
}

function handleMissingLocale(
	request: NextRequest,
) {
	const { pathname, href, origin } = request.nextUrl;
	const locale = getLocale(request);
	const redirectUrl = getRedirectUrl(locale, pathname, origin, href);
	// console.log("redirectUrl", redirectUrl);
	return NextResponse.redirect(redirectUrl);
}

// function pathnameMissingLogin(pathname: string) {
// 	const paths = pathname.split("/");
// 	const pathnameMissingLogin = !paths[2] || paths[2] !== "login";
// 	return pathnameMissingLogin;
// }

function pathnameMissing(pathname: string, required: string) {
	const paths = pathname.split("/");
	const pathnameMissingLogin = !paths[2] || paths[2] !== required;
	return pathnameMissingLogin;
}

function setPath(pathname: string, href: string, origin: string, path: string) {
	const paths = pathname.split("/");
	const redirectUrl = new URL(`${paths[0]}/${path}`, origin);
	const params = new URL(href).searchParams;
	const allParams = Object.fromEntries(params.entries());
	for (const [key, value] of Object.entries(allParams)) {
		redirectUrl.searchParams.append(key, value as string);
	}
	return redirectUrl;
}

function ensurePath(
	{ pathname, href, origin }: any,
	path: string,
	headers: any
) {
	if (pathnameMissing(pathname, path)) {
		const redirectUrl = setPath(pathname, href, origin, path);
		return NextResponse.redirect(redirectUrl.toString());
	}
	return NextResponse.next({request: {
		headers: headers,
	}});
}

function tokenAdapter(payload: any) {
	return {
		id: payload.id,
		user: payload.login,
		name: payload.first_name + " " + payload.last_name,
		image: payload.image.versions.small,
	}
}

function hasSpecialSeatchParams({ href }: any, paramsList: string[]) {
	const params = new URL(href).searchParams;
	const allParams = Object.fromEntries(params.entries());
	const hasSpecialSeatchParams = paramsList.some((param) => param in allParams);
	return hasSpecialSeatchParams;
}

function setParamsIntoHeaders({ href }: any, headers: any, paramsList: string[]) {
	const params = new URL(href).searchParams;
	const allParams = Object.fromEntries(params.entries());
	for (const [key, value] of Object.entries(allParams)) {
		if (paramsList.includes(key)) {
			headers.set(`x-${key}`, value as string);
		}
	}
}

function removeParamsFromUrl({ href }: any, paramsList: string[]) {
	const params = new URL(href).searchParams;
	const allParams = Object.fromEntries(params.entries());
	for (const [key, value] of Object.entries(allParams)) {
		if (paramsList.includes(key)) {
			params.delete(key);
		}
	}
}

function getRedirectPath(pathname: string, redirectPaths: any) {
	const paths = pathname.split("/");
	const redirectPath = redirectPaths[paths[2]];
	return redirectPath;
}

// const paramsList = ["code", "state"];

// const redirectPaths = {
// 	"login": "",
// }


function pathnameRedirect(pathname: string, redirectPaths: any) {
	const paths = pathname.split("/");
	const pathnameRedirect = Object.keys(redirectPaths).includes(paths[2]);
	// console.log(pathnameRedirect);
	return pathnameRedirect;
}

const exceptedFromLocale = [
	"api",
	"pusher",
]

import { withAuth } from "next-auth/middleware";

const getNextAuthMiddleware = (
	lang: Language
) => withAuth(
	function onSuccess(req: NextRequest) {
		return localeMiddleware(req);
	}, {
		pages: {
			signIn: `/${lang}/login`,
			error: `/${lang}/error`,
		}
	}
);

async function localeMiddleware(req: NextRequest) {
	const { pathname, href, origin } = req.nextUrl;
	if (pathnameIsMissingLocale(pathname, localesToPaths, exceptedFromLocale)) {
		return handleMissingLocale(req);
	}
	return NextResponse.next();
}

function authorizeIoT(handle: Function)
{
	return async (request: NextRequest) => {
		const headers = new Headers(request.headers);
		const headerPassword = request.headers.get("x-password");
		if (headerPassword) {// protect stronger 1. only path, 2. ip, 3. other
			headers.set('x-password', headerPassword);
			headers.set('x-user-id', "0");
			headers.set('x-user-name', "device");
			return NextResponse.next({request: {
				headers: headers,
			}});
		}
		return handle(request);
	}
}

import { getToken } from "next-auth/jwt";

export function setHeadersWithToken(handle: Function) {
	return async (request: NextRequest) => {
		const headers = new Headers(request.headers);
		const token = await getToken({ req: request });
		if (token) {
			headers.set('x-user-id', token.id as string);
			headers.set('x-user-login', token.login as string);
			headers.set('x-user-name', token.name as string);
			headers.set('x-user-image', token.image as string);
			headers.set('x-terms_accepted', token.termsAccepted as string);
			headers.set('x-bicycle_owned', JSON.stringify(token.ownership as string));
			return handleConditionalRedirects(token, headers, request);
		}
		const handler = handle(request);
		return handler(request);
	}
}

/*
	followed this example for a pattern
	https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js
*/
export function authHandler() {
	return async (request: NextRequest) => {
		const auth = getNextAuthMiddleware(getLocale(request));
		return (auth as any)(request);
	}
}

function handleConditionalRedirects(
	token: any,
	headers: any,
	request: NextRequest
) {
	const { pathname, href, origin } = request.nextUrl;
	if (pathnameIsMissingLocale(pathname, localesToPaths, exceptedFromLocale)) {
		return handleMissingLocale(request);
	}
	if (token.termsAccepted === false) {
		const response = ensurePath(request.nextUrl, `legal`, headers);
		return response;
	} 
	// else if (token.ownership !== null) {
	// 	const response = ensurePath(request.nextUrl, `2`, headers);
	// 	return response;
	// }
	return NextResponse.next({request: {
		headers: headers,
	}});
}

export const middleware 
	= authorizeIoT(
		setHeadersWithToken(
			authHandler
		)
	);

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg$|.*\\.png$|.*\\.svg$|.*\\.ico$).*)',
		// '/((?!_next|.*\\.(?:[sj]vg|jpg|png|ico)$|/api).*)',
		'/'
	],
}