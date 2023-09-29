import "./globals.css"
import "./animations.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { AppGlobalProviders } from "./[lang]/(dashboard)/components/globalProviders"
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
}

export const metadata: Metadata = {
	title: appLoginConfig.title,
	description: appLoginConfig.description,
}

export default function RootLayout(
	props: RootLayoutProps
) {
	return (
		<html lang="en" className={"fixed inset-0 flex items-center justify-center"}>
			<body>
				<main className={inter.className}>
					{props.children}
				</main>
			</body>
		</html>
	);
}
