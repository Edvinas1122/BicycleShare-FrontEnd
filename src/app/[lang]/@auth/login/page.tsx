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
}: {
	params: {lang: Language};
}) {
	return (
		<>
			<LoginButton>
				{appLoginConfig.buttonText[lang]}
			</LoginButton>
		</>
	);
}
