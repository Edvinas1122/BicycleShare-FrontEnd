'use client'
import {NextUIProvider} from '@nextui-org/react'
import {AuthProvider} from '../../components/authContext'

export function AppGlobalProviders({
	children,
	hasValidToken,
	hasTheAcceptedTerms,
	// userInfo
}: {
	children: React.ReactNode,
	hasValidToken: boolean,
	hasTheAcceptedTerms: boolean,
	// userInfo: any
}) {
	return (
		<NextUIProvider>
			<AuthProvider
				hasValidToken={hasValidToken}
				hasTheAcceptedTerms={hasTheAcceptedTerms}
				// userInfo={userInfo}
			>
			{children}
			</AuthProvider>
		</NextUIProvider>
	);
}
