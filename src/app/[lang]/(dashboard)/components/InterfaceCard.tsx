"use client";

import {LinkButton} from '../components/BicycleCard';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import React from 'react';

type LendControllerProps = {
	props: {
		unlock: string;
		return: string;
	};
};

export const LendController = ({
	props,
}: LendControllerProps) => {
	const classStyles = "w-[350px] h-[150px] pop-appear";
	const route = "/";

	return (
		<Card className={classStyles}>
			<CardHeader>
				<h3 className={"text-xl p-2"}>Lend Controller</h3>
			</CardHeader>
			<CardBody className={"flex flex-row gap-2 p-4"}>
				<LinkButton
					route={route}
					label={props.unlock}
				/>
				<LinkButton
					route={route}
					label={props.return}
				/>
			</CardBody>
		</Card>
	);
}