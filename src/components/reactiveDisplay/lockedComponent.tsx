"use client";
import React from "react";
import { AuthContext } from '@/app/components/authContext';


const LockedDisplay = ({
	children,
}: {
	children: React.ReactNode;
}): React.FC => {

	const {auth, authorized, termsAccepted} = React.useContext(AuthContext);

	if (!termsAccepted) {
		return null;
	}

	return (
		<section className={""}>
			{children}
		</section>
	);
};

export default LockedDisplay;