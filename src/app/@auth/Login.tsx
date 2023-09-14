"use client";

import React from 'react';
import { AuthContext } from '@/app/components/authContext';
import AuthInterface from './components/AuthInterface';
import LoginCard from "./components/LoginCard";
import { appLoginConfig } from '@/conf/organisation.conf';
import { useSearchParams } from 'next/navigation';


const Login = () => {
	const { authorized } = React.useContext(AuthContext);
	
	if (authorized) {
		return null;
	}
	const searchParams = useSearchParams();
	const auth_code = searchParams.get("code");

	return (
		<>
			<LoginCard
				props={appLoginConfig}
				pop_appear={auth_code ? false : true}
				children={
					<AuthInterface
						buttonText={appLoginConfig.buttonText}
					/>
				}
			/>
		</>
	);
};

export default Login;