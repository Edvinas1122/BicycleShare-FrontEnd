import { redirect, RedirectType } from 'next/navigation';
import {
	appLoginConfig,
	getLoginLink
} from '@/conf/organisation.conf';
import { Suspense } from 'react';
import 
	{ constructUserService }
from "@/components/bicycle-api/bicycle.module";

import { LoginButton } from "../components/LoginButton";
import { AuthProfile, GetToken } from '../components/LoginInformation';
import { Language } from '@/conf/dictionary.conf';
import { headers, cookies } from 'next/headers';
import {handleAuth} from "../layout";


export default async function Page({
	params: {lang},
	// searchParams: {code}
}: {
	params: {lang: Language};
	// searchParams: {code: string};
}) {

	const headersList = headers()
	const code = headersList.get('x-code');
	
	async function handleLogin(state: string) {
		"use server";
		const redirect_uri = getLoginLink() + "&state=" + state;
		redirect(redirect_uri, RedirectType.replace);
	}
	
	const user = await handleAuth(code);
	
	// if (user?.error) {
	// 	return (
	// 		<>
	// 			<p className="text-red-500 text-center">
	// 				{`${user?.error}`}
	// 			</p>
	// 			<Suspense>
	// 				<Redirect
	// 					error={user.error}
	// 					/>
	// 			</Suspense>
	// 		</>
	// 	);
	// }

	return (
		<>
			{ 
				!code ? (
					<LoginButton handleLogin={handleLogin}>
						{appLoginConfig.buttonText[lang]}
					</LoginButton>
				): (
					<>
						<AuthProfile 
							user={user.message}
						/>
						<Suspense>
							<FinaliseLogin
								token={user.token}
								refresh={user.message.termsAccepted}
							/>
						</Suspense>
					</>
				)
			}
		</>
	);
}

async function FinaliseLogin({
	token,
	refresh,
}:{
	token: Promise<string>,
	refresh: boolean,
}) {
	const resolved = await token;
	async function handleSetCookie(token: string) {
		"use server";
		const cookie = cookies();
		cookie.set('token', token);
		if (refresh) {
			const redirect_uri = "/";
			redirect(redirect_uri, RedirectType.replace);
		}
	}

	return (
		<>
			<GetToken
				token={resolved}
				method={handleSetCookie}
			/>
		</>
	);
}