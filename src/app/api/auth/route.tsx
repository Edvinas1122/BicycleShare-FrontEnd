import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { ft_fetch } from '@/lib/fetch.util';
import { redirect } from 'next/navigation'
import crypto from 'crypto';
import { authCredentials } from '@/conf/organisation.conf';

interface IntraInfo { // partial user info just what we need
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	image: { 
		link: string,
		versions: {
			medium: string,
			micro: string,
		}
	};
	sucess?: boolean;
}

export async function GET(request: Request) {

	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');

	const intra_request = {
		grant_type: 'authorization_code',
		client_id: authCredentials.oAuth2.client_id,
		client_secret: authCredentials.oAuth2.client_secret,
		code: code,
		redirect_uri: authCredentials.oAuth2.redirect_uri,
	}
	if (code === null || code === undefined || intra_request.client_id === undefined || intra_request.client_secret === undefined) {
		return NextResponse.json({ 
			sucess: false,
			error: "validation failed",
			message: "Missing code or client_id or client_secret",
		});
	}
	const options: RequestInit =
	{
		method: "POST",
		headers: { 'Content-Type': "application/json" },
		body: JSON.stringify(intra_request),
	}

	const response = await fetch(
		"https://api.intra.42.fr/oauth/token",
		options
	);


	const intra_token = await response.json();
	if (intra_token.access_token === undefined) {
		return NextResponse.json({ 
			sucess: false,
			error: "validation failure",
			message: "Intra authorization failed",
		});
	}

	const userInfoResponse = await fetch(
		"https://api.intra.42.fr/v2/me",
		{
			method: "GET",
			headers: {
				'Authorization': `Bearer ${intra_token.access_token}`,
				'Content-Type': "application/json"
			},
		}
	);
	const userInfo = await userInfoResponse.json();
	// console.log(userInfo);
	const user = formatAddapter(userInfo);
	return new Response(
		JSON.stringify(user),
		{
			status: 200,
			headers: {
				'Set-Cookie': `token=${intra_token.access_token}; HttpOnly; Path=/; SameSite=Strict;`,
				'Location': '/',
			},
		}
	);
}

const formatAddapter = (intraInfo: IntraInfo) => {
	return {
		id: intraInfo.id,
		login: intraInfo.login,
		first_name: intraInfo.first_name,
		last_name: intraInfo.last_name,
		image: intraInfo.image,
		sucess: true,
	}
}