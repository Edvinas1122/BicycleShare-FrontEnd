'use client'

import {NextUIProvider} from '@nextui-org/react'
import {AuthProvider} from './authContext'

export function AppGlobalProviders({
	children,
	hasValidToken
}: {
	children: React.ReactNode,
	hasValidToken: boolean
}) {
	return (
		<NextUIProvider>
			<AuthProvider
				hasValidToken={hasValidToken}
			>
			{children}
			</AuthProvider>
		</NextUIProvider>
	);
}