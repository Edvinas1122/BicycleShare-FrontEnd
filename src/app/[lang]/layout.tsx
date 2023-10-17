import {Language, languages} from "@/conf/dictionary.conf";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { headers } from "next/headers";


export async function generateStaticParams() {
	return languages.map((lang: Language) => ({ lang }));
}

export const dynamicParams = false;

export default function Layout({
	auth,
	children,
	params: {lang}
}: {
	auth: React.ReactNode,
	children: React.ReactNode
	params: {lang: Language}
}) {	
	const headers_list = headers();
	const terms_accepted = headers_list.get("x-terms_accepted");
	const session = terms_accepted === "true" ? true : false;
	return session ? children : auth;
}