"use client";
import { Button } from "@nextui-org/react";
import React from "react";

export const LoginButton = ({
	handleLogin,
	children
}: {
	handleLogin: (state: string) => void;
	children: React.ReactNode;
}) => {
	const className = `log_button `;
	const [loading, setLoading] = React.useState(false);

	const handleButton = () => {
		setLoading(true);
		const domain = window.location.origin;
		handleLogin(domain);
	};

	return (
		<Button
			onPress={handleButton}
			radius="lg"
			className={className}
			variant="shadow"
			isLoading={loading}
			>
			{children}
		</Button>
	);
};