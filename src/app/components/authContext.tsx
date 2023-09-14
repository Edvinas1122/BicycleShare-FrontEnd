"use client";
import React from 'react';

class Auth {
	private path = `${process.env.NEXT_PUBLIC_HOSTNAME}/api/auth`;
	private setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
	private lastSuccessfull: boolean = false;
	constructor(
		setAuthorized: React.Dispatch<React.SetStateAction<boolean>>
	) {
		this.setAuthorized = setAuthorized;
	}

	async login(code: string): Promise<any> {
		const res = await fetch(`${this.path}/?code=${code}`, {});
		if (res.status === 200) {
			this.lastSuccessfull = true;
		}
		return res;
	}

	public closeAuthorization(): void {
		if (this.lastSuccessfull) {
			this.setAuthorized(true);
		}
	}

	async hasAcceptedTerms(): Promise<boolean> {
		return false;
	}
}

export const AuthContext = React.createContext<{
		auth: Auth;
		authorized: boolean
	}>({
		auth: new Auth(() => {}),
		authorized: false,
	});

export const AuthProvider: React.FC<{
	children: React.ReactNode,
	hasValidToken: boolean
}> = ({
	children,
	hasValidToken
}: {
	children: React.ReactNode;
	hasValidToken: boolean;
}) => {
	const [authorized, setAuthorized] = React.useState<boolean>(hasValidToken);
	const [terms, setTerms] = React.useState<boolean>(false);
	const auth = new Auth(
		setAuthorized
	);

	return (
		<AuthContext.Provider value={{auth, authorized}}>
			{children}
		</AuthContext.Provider>
	);
};
