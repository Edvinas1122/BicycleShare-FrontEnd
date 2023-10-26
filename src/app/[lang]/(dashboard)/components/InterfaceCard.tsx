"use client";

import {LinkButton} from '../components/BicycleCard';
import {Card, CardBody, CardFooter, Divider, CardHeader} from '@nextui-org/react';
import React from 'react';

type LendControllerProps = {
	props: {
		bicycle_id: string;
	};
	terms: {
		lend_controller: string;
		unlock: string;
		return: string;
	}
};

export const LendController = ({
	props,
	terms
}: LendControllerProps) => {
	const classStyles = "w-[350px] h-[180px] pop-appear";
	const unlock_route = `/${props.bicycle_id}/select/?interact=unlock`;
	const return_route = `/${props.bicycle_id}/select/?interact=return`;

	return (
		<Card className={classStyles}>
			<CardHeader>
				<h3 className={`m-2`}>{terms.lend_controller}</h3>
			</CardHeader>
			<Divider/>
			<CardBody className={"flex flex-col justify-center align-center"}>
				<div className={`flex-row flex gap-2`}>
				<LinkButton
					route={unlock_route}
					label={terms.unlock}
					/>
				<LinkButton
					route={return_route}
					label={terms.return}
					/>
				</div>
			</CardBody>
			{/* <Divider/> */}
		</Card>
	);
}