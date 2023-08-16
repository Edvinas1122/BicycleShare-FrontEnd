"use client";
import React from "react";
import LoginCard, {LoginCardProps} from "./components/LoginCard";
import {LoginButton} from "./components/LoginButton";
import {LoginLeader} from "./components/LoginLeader";
import {useRouter, useSearchParams} from "next/navigation";
import {AuthContext, } from "@/app/components/authContext";
import { appLoginConfig, authCredentials } from "@/conf/organisation.conf";


const AuthPage: Function = () => {
	const {auth} = React.useContext(AuthContext);
	
	if (auth.isAuthenticated) {
		return null;
	}

	const children = (
		<AuthState
			auth={auth}
		/>
	);

	return (
		<LoginCard 
			props={appLoginConfig}
			children={
				children
			}
		/>
	);
};



const AuthState: Function = ({
	auth
}: {
	auth: any
}) => {
	const searchParams = useSearchParams();
	const auth_code = searchParams.get("code");
	
	if (auth_code) {
		return (
			<LoginLeader
			auth_code={auth_code}
			auth={auth}
			/>
			);
	}
	const router = useRouter();		
	const handleLogin = () => {
		router.push(authCredentials.oAuth2.link);
	};
	return (
		<LoginButton
			handleLogin={handleLogin}
			buttonText={appLoginConfig.buttonText}
		/>
	);
};

export default AuthPage;
