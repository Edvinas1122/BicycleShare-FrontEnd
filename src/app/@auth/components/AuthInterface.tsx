"use client";
import React from "react";
import {LoginButton} from "./LoginButton";
import {LoginInformation, UserInfo} from "./LoginInformation";
import {useRouter, useSearchParams} from "next/navigation";
import {AuthContext} from "@/app/components/authContext";
import {appLoginConfig, authCredentials} from "@/conf/organisation.conf";


const AuthInterface: React.FC<{buttonText: string}> = ({
	buttonText
}:{
	buttonText?: string
}) => {
	const searchParams = useSearchParams();
	const auth_code = searchParams.get("code");
	const router = useRouter();
	const {auth, authorized} = React.useContext(AuthContext);
	const handleOAuthRedirect = () => {
		setLoading(true);
		router.replace(authCredentials.oAuth2.link);
	};
	const [loading, setLoading] = React.useState<boolean>(auth_code ? true : false);
	const [info, setInfo] = React.useState<string | UserInfo>("");
	const responseEffect = (data: any) => {
		setInfo(data.message);
		setLoading(false);
		setTimeout(() => {
			auth.closeAuthorization(data.message.termsAccepted);
			if (data.message.termsAccepted) {
				router.replace("/");
			} else {
				router.replace("/legal");
			}
		}, 1500);
	};

	React.useEffect(() => {
		if (auth_code) {
			setLoading(true);
			auth.login(auth_code).then((response) => {
				response.json().then((data: any) => {
					responseEffect(data);
				}).catch((err: any) => {
					responseEffect(err);
				});
			});
		} else {
			setLoading(false);
		}
	}, [auth_code]);

	return (
		auth_code ? 
				<LoginInformation
					loading={loading}
					info={info} 
					/>: 
				<LoginButton 
					handleLogin={handleOAuthRedirect}
					buttonText={buttonText? buttonText : "Login"}
				/>
	);
};

export default AuthInterface;