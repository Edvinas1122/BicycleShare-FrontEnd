import "./globals.css"
import "./animations.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppGlobalProviders } from "./components/globalProviders"
import { validateToken } from "./components/token.service"
import {appLoginConfig} from "@/conf/organisation.conf";
import { cookies } from 'next/headers'

/*
	use 
	https://nextui.org/docs/guide/installation
*/ 

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
	children: React.ReactNode
	auth: React.ReactNode
}

export const metadata: Metadata = {
	title: appLoginConfig.title,
	description: appLoginConfig.description,
}

export default async function RootLayout(
	props: RootLayoutProps
) {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	const hasValidToken = token ? validateToken(token.value): false;
	return (
		<html lang="en" className={"fixed inset-0 flex items-center justify-center"}>
			<body>
			<AppGlobalProviders
				hasValidToken={hasValidToken}
			>
				<main className={inter.className}>
					{!hasValidToken ? props.auth: null}
					{props.children}
				</main>
			</AppGlobalProviders>
			</body>
		</html>
	);
}
