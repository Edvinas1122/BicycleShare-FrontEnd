import "./globals.css"
import "./animations.css"
import type { Metadata } from 'next'
import {appLoginConfig} from "@/conf/organisation.conf";


/*
	NextUI library
	https://nextui.org/docs/guide/installation
*/ 

interface RootLayoutProps {
	children: React.ReactNode;
	// param: {session: any};
}

export const metadata: Metadata = {
	title: appLoginConfig.title,
	description: appLoginConfig.description,
}

export default function RootLayout(
	props: RootLayoutProps,
	// param: {session: any}
) {
	return (
		<>
			{props.children}
		</>
	);
}
