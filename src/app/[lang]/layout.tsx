import {headers} from "next/headers"
import {Language, languages} from "@/conf/dictionary.conf";


export async function generateStaticParams() {
	return languages.map((lang: Language) => ({ lang }));
}

export const dynamicParams = false;

export default function RootLayout({
	auth,
	children,
}: {
	auth: React.ReactNode,
	children: React.ReactNode
}) {

	const authorized = headers().get('x-authorised')
	if (authorized === null) throw new Error('x-authorised header not found');
	const authorizedBool = authorized.includes('true');
	return authorizedBool ? children : auth;
}