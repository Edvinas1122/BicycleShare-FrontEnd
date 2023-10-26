"use client";
import React from 'react';
import {Button} from '@nextui-org/button';

export function StatefulButton({
	children,
	action,
}: {
	children: React.ReactNode;
	action: () => void;
}) {
	const [loading, setLoading] = React.useState(false);

	return (
		<Button
			isLoading={loading}
			onPress={() => {
				setLoading(true);
				action();
			}}
		>
			{children}
		</Button>
	);
}

import Link from 'next/link';

export function LinkButton({
	label,
	route,
	props,
}: {
	label: string;
	route: string;
	props?: {
		[key: string]: string;
	}
}) {

	return (
		<>
			<Button as={Link}
				href={route}
				{...props}
				prefetch={true}
			>
				{label}
			</Button>
		</>
	)
};

import { useRouter } from 'next/navigation';

export function QueryButton({
	label,
	props,
	params,
	route,
	defaultState,
}: {
	label: string,
	route: string,
	props?: {
		[key: string]: string;
	},
	params: string,
	defaultState: string,
}) {
	const router = useRouter();
	const routerAction = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const search = urlParams ? urlParams.get(params) : null;
		const fullRoute = route + "/" + (search ? search : defaultState)
		router.push(fullRoute);
	};

	return (
		<>
			<Button
				onPress={routerAction}
				{...props}
			>
				{label}
			</Button>
		</>
	)
};

import { Language } from "@/conf/dictionary.conf";

export type ButtonProps = {
	label: string;
	route: string;
	props?: {
		[key: string]: string;
	},
	type?: "link";
};

export interface QueryButtonProps extends Omit<ButtonProps, 'type'> {
	type: "query";
	defaultState: string;
	params: string;
}

export function Buttons({
	buttons,
	lang,
	currentPath,
}: {
	buttons: (ButtonProps | QueryButtonProps)[];
	lang: Language;
	currentPath: string;
}) {

	return (
		<>
			{buttons.map((button) => {
				if (button.type === "link" || !button.type) {
					return (
						<LinkButton
							key={button.label}
							label={button.label}
							route={currentPath + button.route}
							props={button.props}
						/>
					);
				} else if (button.type === "query") {
					return (
						<QueryButton
							key={button.label}
							label={button.label}
							route={currentPath + button.route}
							props={button.props}
							params={button.params}
							defaultState={button.defaultState}
						/>
					);
				}
			})}
		</>
	);
}

export function BackButton({
	label,
	props,
}: {
	label: string;
	props?: {
		[key: string]: string;
	}
}) {
	const router = useRouter();

	const routerAction = () => {
		router.back();
	};

	return (
		<>
			<Button
				onClick={routerAction}
				{...props}
			>
				{label}
			</Button>
		</>
	)
}