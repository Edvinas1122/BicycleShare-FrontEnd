"use client";

import {LinkButton} from '../components/BicycleCard';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import React from 'react';

type LendControllerProps = {
	props: {
		unlock: string;
		return: string;
		bicycle_id: string;
	};
};

export const LendController = ({
	props,
}: LendControllerProps) => {
	const classStyles = "w-[350px] h-[150px] pop-appear";
	const unlock_route = `/${props.bicycle_id}/select/?interact=unlock`;
	const return_route = `/${props.bicycle_id}/select/?interact=return`;

	return (
		<Card className={classStyles}>
			<CardHeader>
				<h3 className={"text-xl p-2"}>Lend Controller</h3>
			</CardHeader>
			<CardBody className={"flex flex-row gap-2 p-4"}>
				<LinkButton
					route={unlock_route}
					label={props.unlock}
				/>
				<LinkButton
					route={return_route}
					label={props.return}
				/>
			</CardBody>
		</Card>
	);
}