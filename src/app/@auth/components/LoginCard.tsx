import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
	Button,
} from "@nextui-org/react";

export interface LoginCardProps {
	icon: string;
	title: string;
	organization: string;
	description: string;
	subtitle?: string;
	buttonText: string;
	devLink?: string;
	devLinkText?: string;
}


const LoginCard: Function = ({
	props,
	handleLogin,
	children
} : {
	props: LoginCardProps
	handleLogin: Function
	children?: React.ReactNode
}) => {
	const { icon,
		title,
		organization,
		description,
		buttonText,
		devLink,
		devLinkText
	} = props;

	return (
		<Card className="max-w-[400px] mx-auto loading h-[300px]">
			<CardHeader className="flex gap-3">
				<Image
					src={icon}
					alt="Bike Icon"
					height={50}
					width={50}
					radius="sm"
				/>
				<div className="flex flex-col">
					<p className="text-md">{title}</p>
					<p className="text-small text-default-500 italic">{organization}</p>
				</div>
			</CardHeader>
			<Divider/>
			<CardBody>
				<p className="mb-4 italic text-gray-600">{`" ${description}..."`}</p>
				<div className="flex flex-col justify-center items-center h-full">
					{children}
				</div>
			</CardBody>
			<Divider/>
			<CardFooter>
				<Link
					isBlock
					isExternal
					showAnchorIcon
					href={devLink ? devLink : ""}
				>
					{devLinkText ? devLinkText : ""}
				</Link>
			</CardFooter>
		</Card>
	);
}

export default LoginCard;