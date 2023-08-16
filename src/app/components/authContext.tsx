"use client";
import React from 'react';
import { cookies } from 'next-cookies';

interface Auth {
	isAuthenticated: boolean;
	error: string;
	user: any;
	token: string;
	fetchLoginAPI: (code: string) => void;
}

interface AuthContext {
	auth: Auth;
}

export const AuthContext = React.createContext<AuthContext>({
	auth: {
		isAuthenticated: false,
		error: null,
		user: null,
		token: null,
		fetchLoginAPI: (code: string) => {},
	},
});

export const AuthProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [auth, setAuth] = React.useState<Auth>({
		isAuthenticated: false,
		error: null,
		user: null,
		token: null,
		fetchLoginAPI: (code: string) => {
		   fetch(`/api/auth?code=${code}`).then((res) => {
				const data = res.json();
				data.then((data) => {
					console.log(data);
					console.log("here");
				   if (data.sucess === false)
				   {
					   setAuth({
						   isAuthenticated: false,
						   error: data.error,
						   user: null,
						   token: null,
						   fetchLoginAPI: (code: string) => {},
						});
					} else
					{
						console.log("here");
						setAuth({
							isAuthenticated: true,
							error: null,
							user: data.login,
							token: data.token,
							fetchLoginAPI: (code: string) => {},
						});
					}
				});
			});
		},
	});



	return (
		<AuthContext.Provider value={{ auth }}>
			{children}
		</AuthContext.Provider>
	)
}