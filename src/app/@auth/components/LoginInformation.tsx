import React from "react";
import { Spinner, User } from "@nextui-org/react";

export const LoginInformation = ({
	loading,
	info,
}: {
	loading: boolean,
	info: string,
}) => {


	if (loading) return (
		<Spinner size="lg" />
	);
	return (
		<AuthResult
			info={info}
		/>
	);
};

const AuthResult = ({
	info
}: {
	info: any,
}) => {
	return (
		<div className={"text-center pop-appear"}>
			<User
				name="Jane Doe"
				description="Product Designer"
				avatarProps={{
				src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
				}}
			/>
		</div>

	);
}