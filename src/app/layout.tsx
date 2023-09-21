import "./globals.css"
import "./animations.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { AppGlobalProviders } from "./[lang]/components/globalProviders"
import { Token } from "@/components/next-api-utils/validation"
import {appLoginConfig} from "@/conf/organisation.conf";
import LockedDisplay from "@/components/reactiveDisplay/lockedComponent";

/*
	NextUI library
	https://nextui.org/docs/guide/installation
*/ 

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
	children: React.ReactNode;
	auth: React.ReactNode;
}

export const metadata: Metadata = {
	title: appLoginConfig.title,
	description: appLoginConfig.description,
}

export default function RootLayout(
	props: RootLayoutProps
) {
	const token = new Token();
	const acceptedTerms = token.hasAcceptedTerms();

	return (
		<html lang="en" className={"fixed inset-0 flex items-center justify-center"}>
			<body>
			<AppGlobalProviders
				hasValidToken={token.hasAVaildToken()}
				hasTheAcceptedTerms={acceptedTerms}
				// userInfo={token.getUserFromToken(formatUser)}
			>
				<main className={inter.className}>
					{!acceptedTerms ? props.auth: null}
					<LockedDisplay>
					{props.children}
					</LockedDisplay>
				</main>
			</AppGlobalProviders>
			</body>
		</html>
	);
}
