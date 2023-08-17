"use client";

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
import {
	QuoteCollection
} from "./QuoteCollection";

export interface LoginCardProps {
	icon: string;
	title: string;
	organization: string;
	description: string;
	descriptionCollection?: string[];
	subtitle?: string;
	buttonText: string;
	devLink?: string;
	devLinkText?: string;
}

const LoginCard: Function = ({
	props,
	pop_appear,
	children
} : {
	props: LoginCardProps,
	pop_appear?: boolean,
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
					quotes={props.descriptionCollection ? props.descriptionCollection : props.description}
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