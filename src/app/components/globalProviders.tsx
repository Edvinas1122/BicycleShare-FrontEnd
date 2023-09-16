'use client'
import {NextUIProvider} from '@nextui-org/react'
import {AuthProvider} from './authContext'

export function AppGlobalProviders({
	children,
	hasValidToken,
	hasTheAcceptedTerms
}: {
	children: React.ReactNode,
	hasValidToken: boolean,
	hasTheAcceptedTerms: boolean
}) {
	return (
		<NextUIProvider>
			<AuthProvider
				hasValidToken={hasValidToken}
				hasTheAcceptedTerms={hasTheAcceptedTerms}
			>
			{children}
			</AuthProvider>
		</NextUIProvider>
	);
}
