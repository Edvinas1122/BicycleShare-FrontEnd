"use client";
import React from "react";
import { AuthContext } from '@/app/components/authContext';


const LockedDisplay = ({
	children,
}: {
	children: React.ReactNode;
}): React.FC => {

	const {auth, authorized} = React.useContext(AuthContext);

	if (!authorized) {
		return null;
	}

	return (
		<section className={"pop-appear"}>
			{children}
		</section>
	);
};

export default LockedDisplay;