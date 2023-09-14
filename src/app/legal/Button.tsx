"use client";
import { Button } from "@nextui-org/react";

const AcceptButton = ({
	handleLogin,
	buttonText,
}: {
	handleLogin: () => void;
	buttonText: string;
}) => {
	return (
		<Button
			onPress={handleLogin}
			radius="lg"
			className="log_button"
			variant="shadow"
		>
			{buttonText}
		</Button>
	);
};

export default AcceptButton;