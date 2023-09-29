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