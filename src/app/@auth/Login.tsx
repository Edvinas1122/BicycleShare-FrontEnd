"use client";

import React from 'react';
import { AuthContext } from '@/app/components/authContext';
import AuthInterface from './components/AuthInterface';
import LoginCard from "./components/LoginCard";
import { appLoginConfig } from '@/conf/organisation.conf';
import { useSearchParams} from 'next/navigation';
import Legal from './legal/router';


const Login = () => {
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
					children={
						<AuthInterface
							buttonText={appLoginConfig.buttonText}
						/>
					}
				/> : <Legal/>
			}
		</>
	);
};

export default Login;