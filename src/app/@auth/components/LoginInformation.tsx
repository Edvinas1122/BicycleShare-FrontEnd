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

export const LoginInformation = ({
	loading,
	info,
}: {
	loading: boolean,
	info: string | UserInfo,
}) => {
	if (loading) return <Spinner size="lg" />;

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

const AuthProfile = ({
	user
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