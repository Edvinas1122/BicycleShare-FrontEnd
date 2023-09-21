"use client";

import React from 'react';
import { AuthContext } from '@/app/components/authContext';
import AuthInterface from '../components/AuthInterface';
import LoginCard from "../components/LoginCard";
import { useSearchParams} from 'next/navigation';
import Legal from "./legal/router";


const Login = ({
	lang,
	appLoginConfig
}:{
	lang: string
	appLoginConfig: any
}) => {
	const { authorized, termsAccepted } = React.useContext(AuthContext);
	
	if (authorized && termsAccepted) {
		return null;
	}

	const searchParams = useSearchParams();
	const auth_code = searchParams.get("code");

	return (
		<>
			{
				!authorized ? <LoginCard
					props={appLoginConfig}
					pop_appear={auth_code ? false : true}
					lang={lang}
					children={
						<AuthInterface
							buttonText={appLoginConfig.buttonText[lang]}
						/>
					}
				/> : <Legal/>
			}
		</>
	);
};

export default Login;