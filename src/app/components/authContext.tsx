"use client";
import React from 'react';
import { getHostConfig } from '@/conf/host.conf';

class Auth {
	private path = `${getHostConfig().hostName}/api/auth`;
	private setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
	private setTerms: React.Dispatch<React.SetStateAction<boolean>>;
	private lastSuccessfull: boolean = false;
	constructor(
		setAuthorized: React.Dispatch<React.SetStateAction<boolean>>,
		setTerms: React.Dispatch<React.SetStateAction<boolean>>
	) {
		this.setAuthorized = setAuthorized;
		this.setTerms = setTerms;
	}

	async login(code: string): Promise<any> {
		const res = await fetch(`${this.path}/?code=${code}`, {});
		if (res.status === 200) {
			this.lastSuccessfull = true;
		}
		return res;
	}

	public displayTerms(): void {
		
	}

	public closeAuthorization(closeTerms: boolean): void {
		if (this.lastSuccessfull) {
			this.setAuthorized(true);
		}
		if (closeTerms) { // close if accepted
			this.setTerms(true);
		}
	}

	async hasAcceptedTerms(): Promise<boolean> {
		return false;
	}
}

export const AuthContext = React.createContext<{
		auth: Auth;
		authorized: boolean
		termsAccepted: boolean
	}>({
		auth: new Auth(() => {}, () => {}),
		authorized: false,
		termsAccepted: false
	});

type UserInfo = {
	name: string;
	username: string;
	// language: string;
	image: string;
}

export const AuthProvider: React.FC<{
	children: React.ReactNode,
	hasValidToken: boolean,
	hasTheAcceptedTerms: boolean,
}> = ({
	children,
	hasValidToken,
	hasTheAcceptedTerms,
}: {
	children: React.ReactNode;
	hasValidToken: boolean;
	hasTheAcceptedTerms: boolean;
}) => {
	const [authorized, setAuthorized] = React.useState<boolean>(hasValidToken);
	const [termsAccepted, setTerms] = React.useState<boolean>(hasTheAcceptedTerms);
	const auth = new Auth(
		setAuthorized,
		setTerms,
	);

	return (
		<AuthContext.Provider value={{auth, authorized, termsAccepted}}>
			{children}
		</AuthContext.Provider>
	);
};
