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
			radius="large"
			className="log_button"
			variant="shadow"
		>
			{buttonText}
		</Button>
	);
};