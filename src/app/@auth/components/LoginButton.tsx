import { Button } from "@nextui-org/react";

export const LoginButton = ({
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