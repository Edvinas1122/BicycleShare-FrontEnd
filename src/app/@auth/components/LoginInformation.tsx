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

	console.log(info);
	return info?.login ? (
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

	console.log(user);
	return (
		<div className={"text-center pop-appear"}>
			<User
				name={user.first_name + " " + user.last_name}
				description={user.login}
				avatarProps={{
					src: user.image.versions.small,
				}}
			/>
		</div>
	);
}