"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { signIn } from "next-auth/react"

export const LoginButton = ({
	children,
	handleLogin
}: {
	children: React.ReactNode;
	handleLogin?: (state: string) => void;
}) => {
	const className = `log_button `;
	const [loading, setLoading] = React.useState(false);

	const handleButton = () => {
		setLoading(true);
		const domain = window.location.origin;
		handleLogin && handleLogin(domain);
		signIn("42-school")
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