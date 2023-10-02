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
import { headers, cookies } from 'next/headers'
import handleOAuth from './OAuth2';

async function checkDatabase(user: any) {
	console.log("check database", user);
	const userService = constructUserService({cache: 'no-store'});
	const userOnNotion = await userService.getUserByIntraID(user.id);
	console.log("user on notion?", user.id, userOnNotion);
	const userWithInfo = {...user, termsAccepted: userOnNotion ? true : false}
	return userWithInfo;
}

async function handleAuth(code: string | null, state?: string) {
	"use server"
	if (code) {
		try {
			const response = await handleOAuth(code, checkDatabase);
			return response;
		} catch (error) {
			return {error: error};
		}
	}
	return null;
}

export default async function Page({
	params: {lang},
	// searchParams: {code}
}: {
	params: {lang: Language};
	// searchParams: {code: string};
}) {

	const headersList = headers()
	const code = headersList.get('x-code');
	const state = headersList.get('x-state');

	if (state) {
		redirect(state + "/" + lang + "/login" + "?code=" + code, RedirectType.replace)
	}
	
	async function handleLogin(state: string) {
		"use server";
		const redirect_uri = getLoginLink() + "&state=" + state;
		redirect(redirect_uri, RedirectType.replace);
	}
	
	const user = await handleAuth(code);
	
	if (user?.error) {
		return (
			<>
				<p className="text-red-500 text-center">
					{`${user?.error}`}
				</p>
				<Suspense>
					<Redirect
						error={user.error}
						/>
				</Suspense>
			</>
		);
	}

	return (
		<>
			{ 
				!code ? (
					<LoginButton handleLogin={handleLogin}>
						{appLoginConfig.buttonText[lang]}
					</LoginButton>
				): (<>
					<AuthProfile 
						user={user.message}
						/>
					<Suspense>
						<FinaliseLogin
							token={user.token}
							refresh={user.message.termsAccepted}
							state={user.state}
						/>
					</Suspense>
					</>
				)
			}
		</>
	);
}

async function Redirect({
	error,
}: {
	error: any;
}) {

	const promise = await new Promise(resolve => setTimeout(resolve, 1000));
	return null;
}

async function FinaliseLogin({
	token,
	refresh,
	state,
}:{
	token: Promise<string>,
	refresh: boolean,
	state: string | null,
}) {
	const resolved = await token;
	async function handleSetCookie(token: string) {
		"use server";
		const cookie = cookies();
		cookie.set('token', token);
		if (refresh) {
			const redirect_uri = state ? state : "/";
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