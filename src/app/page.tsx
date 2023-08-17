"use client";
import {Button} from '@nextui-org/button';
import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card';
import { AuthContext } from './components/authContext';
import React from 'react';

export default function Page() {

	const {auth, authorized} = React.useContext(AuthContext);

	if (!authorized) {
		return null;
	}

	return (
	<div className="pop-appear">
		<Card>
		<CardHeader>
			<h4>Card Title</h4>
		</CardHeader>
		<CardBody>
			<p>Card Body</p>
			<p>{authorized ? "is Authorized": "is not Authorized"}</p>
		</CardBody>
		<CardFooter>
			<Button>Card Footer</Button>
		</CardFooter>
		</Card>
	</div>
	)
}