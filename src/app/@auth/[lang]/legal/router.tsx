"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const Legal = () => {

	const router = useRouter();
	React.useEffect(() => {
		router.replace("/legal");
	}, []);

	return (
		<>
		</>
	);
}

export default Legal;