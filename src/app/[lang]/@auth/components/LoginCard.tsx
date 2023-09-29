"use client";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
	Skeleton
} from "@nextui-org/react";

type InfoContent = {
	[key: string]: string;
}

type InfoContentArray = {
	[key: string]: string[];
}

export interface LoginCardProps {
	icon: string;
	title: string;
	organization: string;
	description: string;
	descriptionCollection: InfoContentArray;
	subtitle?: string;
	buttonText: InfoContent;
	devLink?: string;
	devLinkTexts?: InfoContent;
}

const LoginCard: React.FC<{
		props: LoginCardProps;
		children: React.ReactNode;
		lang: string;
		cardClass: string
}> = ({
	props,
	children,
	lang,
	cardClass
} : {
	props: LoginCardProps,
	children: React.ReactNode,
	lang: string,
	cardClass: string,
}) => {
	const { icon,
		title,
		organization,
		description,
		buttonText,
		devLink,
		devLinkTexts
	} = props;

	const devLinkText = devLinkTexts && devLinkTexts[lang];

	return (
		<Card className={cardClass}>
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
				{children}
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