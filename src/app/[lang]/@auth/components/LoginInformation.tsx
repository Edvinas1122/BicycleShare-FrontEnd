"use client"
import React from "react";
import { Spinner, User } from "@nextui-org/react";

export interface UserInfo {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	image: { 
		link: string,
		versions: {
			medium: string,
			micro: string,
			small: string,
		}
	};
	sucess?: boolean;
}

export const Loader = () => {
	return (
		<>
			<Spinner size="lg" />
		</>
	);
}

export const LoginInformation = ({
	info,
}: {
	info: string | UserInfo,
}) => {

	const isUserInfo = (info: string | UserInfo): info is UserInfo => {
		return (info as UserInfo).login !== undefined;
	};

	return isUserInfo(info) ? (
		<AuthProfile user={info as UserInfo} />
		) : (
		<AuthResult info={info} />
	);
};

const AuthResult = ({
	info
}: {
	info: any,
}) => {
	return (
		<p className={"text-center pop-appear"}>
			{info}
		</p>
	);
}

export const AuthProfile = ({
	user,
}: {
	user: UserInfo,
}) => {

	return (
		<div className={"text-center pop-appear"}>
			<User
				name={user.first_name + " " + user.last_name}
				description={user.login}
				avatarProps={{
					src: user.image.versions.small,
					isBordered: true,
				}}
			/>
		</div>
	);
}

export const GetToken = ({
	token,
	method
} :{
	token: string,
	method: (token: string) => void
}) => {

	React.useEffect(
		() => {
			method(token)
		}, [token, method]
	);

	return null;
}