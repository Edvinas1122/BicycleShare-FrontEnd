"use client";
import React, {useContext} from "react";
import { AuthContext } from '@/app/components/authContext';

interface LockedDisplayProps {
	children: React.ReactNode;
}

const LockedDisplay: React.FC<LockedDisplayProps> = ({
	children
}) => {
	const {
		auth,
		authorized,
		termsAccepted
	} = useContext(AuthContext);

	if (!termsAccepted) {
		return null;
	}

	return <section>{children}</section>;
};

export default LockedDisplay;