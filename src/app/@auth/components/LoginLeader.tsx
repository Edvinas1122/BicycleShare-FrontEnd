import React from "react";
import { Button, Spinner } from "@nextui-org/react";

export const LoginLeader = ({
	auth_code,
	auth
}: {
	auth_code: string,
	auth: any,
}) => {

	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		if (!auth.isAuthenticated) {
			auth.fetchLoginAPI(auth_code);
			setLoading(true)
		} else {
			setLoading(false)
		}
	}, [auth]);

	if (loading) return (
		<Spinner size="lg" />
	);
	return (
		<AuthResult auth={auth} />
	);
};

const AuthResult = ({
	auth
}: {
	auth: any,
}) => {
	if (auth.isAuthenticated) {
		return (
			<p>
				{auth.user}
			</p>
		);
	} else if (auth.error) {
		return (
			<p>
				{auth.error}
			</p>
		);
	} else {
		return (
			<p>
				Loading...
			</p>
		);
	}
}