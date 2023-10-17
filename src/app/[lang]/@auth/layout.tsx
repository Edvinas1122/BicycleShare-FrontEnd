import {
	Language
} from "@/conf/dictionary.conf";
import LoginCard from "./components/LoginCard";
import handleOAuth from './components/OAuth2';
import {
	redirect,
	RedirectType
} from 'next/navigation';
import 
	constructBicycleService,
	{ constructUserService }
from "@/components/bicycle-api/bicycle.module";
import {
	Token
} from "@/components/next-api-utils/validation";
import {
	appLoginConfig,
	getLoginLink
} from '@/conf/organisation.conf';
import { headers } from "next/headers";


export async function getTermsAndConditions() {
	const bicycleService = constructBicycleService({next: {tags: ["terms"]}});
	const termsAndConditions = await bicycleService.getTermsAndConditions();
	return termsAndConditions;
}

export async function acceptTermsAndConditions() {
		"use server";
		const service = constructUserService({cache: 'no-store'});
		const headers_list = headers();
		const userInterface = await service.getUserInterface({
			id: Number(headers_list.get("x-user-id") as string),
			name: headers_list.get("x-user-name") as string,
			login: headers_list.get("x-user-login") as string,
			image: headers_list.get("x-user-image") as string,
		})
		const result = await userInterface.acceptTermsAndConditions();
		if (result.status !== 200) {
			console.error("Error accepting terms and conditions", result);
		}
		redirect('/');
}

async function checkDatabase(user: any) {
	const userService = constructUserService({cache: 'no-store'});
	const userOnNotion = await userService.getUserByIntraID(user.id);
	const userWithInfo = {...user, termsAccepted: userOnNotion ? true : false}
	return userWithInfo;
}

export async function handleAuth(code: string | null, state?: string) {
	"use server"
	if (code) {
		// try {
			const response = await handleOAuth(code, checkDatabase);
			return response;
		// } catch (error) { return {error: error};}
	}
	return null;
}

export default function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: {lang: Language};
}) {

	const cardClass = "min-w-[350px] max-w-[30vw] mx-auto loading min-h-[300px] max-h-[80vh]";

	return (
		<>
			<LoginCard
				props={appLoginConfig}
				lang={params.lang}
				cardClass={cardClass}
			>
			{children}
			</LoginCard>
		</>
	);
}