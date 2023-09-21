import { NextResponse, NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const localesToPaths = {
	'en-US': 'en',
	'nl-NL': 'nl',
	'nl': 'nl',
	'de-DE': 'de',
}

function getLocale(request: NextRequest) { 
	const headers = Object.fromEntries(request.headers.entries());
	const languages = new Negotiator({ headers }).languages()
	console.log(languages)
	const locales = Object.keys(localesToPaths);
	const defaultLocale = 'en-US'
	const lang = languages && languages[0] !== '*' ? match(languages, locales, defaultLocale) : defaultLocale;
	const locale = localesToPaths[lang as keyof typeof localesToPaths]
	return locale;
}

export function middleware(request: NextRequest) {
	const { pathname, href, origin } = request.nextUrl;
	const pathnameIsMissingLocale = Object.values(localesToPaths).every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		const redirectUrl = new URL(`/${locale}${pathname}`, origin);
		const params = new URL(href).searchParams;
		
		const allParams = Object.fromEntries(params.entries());
		for (const [key, value] of Object.entries(allParams)) {
			redirectUrl.searchParams.append(key, value as string);
		}

		return NextResponse.redirect(redirectUrl.href);
	}
}

export const config = {
	matcher: [
		'/((?!_next|.*\\.svg$|.*\\.jpg$|.*\\.png$|/api|/api/revalidate).*)',
		'/'
	],
}