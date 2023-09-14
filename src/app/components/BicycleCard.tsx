"use client";
import {Button} from '@nextui-org/button';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import React from 'react';

interface BicycleInfo {
	lockerId: number;
	name: string;
	image: string;
}

export default function BicycleCard({
	props
}: {
	props: BicycleInfo;
}) {

	return (
		<div className="pop-appear">
			<Card>
			<CardHeader>
				<h2>{props.name}</h2>
			</CardHeader>
			<CardBody>
				<img src={props.image} alt="Bicycle Image" />
			</CardBody>
			<CardFooter>
				<Button>Reserve</Button>
			</CardFooter>
			</Card>
		</div>
	)
}