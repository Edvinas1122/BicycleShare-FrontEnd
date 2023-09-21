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
import {
	QuoteCollection
} from "./QuoteCollection";

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
		pop_appear?: boolean;
		children?: React.ReactNode;
		lang: string;
}> = ({
	props,
	pop_appear,
	children,
	lang
} : {
	props: LoginCardProps,
	pop_appear?: boolean,
	children?: React.ReactNode,
	lang: string
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
	const collection = props.descriptionCollection && props.descriptionCollection[lang];
	const cardClass = "max-w-[400px] mx-auto loading h-[300px]" +
		(pop_appear ? " pop-appear" : "");

	const descriptionClass = "mb-4 italic text-gray-600 " +
		(pop_appear ? "opacity-0 delayed-fade-in" : "");

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
				<QuoteCollection
					quotes={collection}
					/>
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