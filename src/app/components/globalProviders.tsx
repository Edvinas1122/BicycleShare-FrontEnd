'use client'

import {NextUIProvider} from '@nextui-org/react'
import { AuthProvider } from './authContext'

export function AppGlobalProviders({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<NextUIProvider>
				<AuthProvider>
				{children}
				</AuthProvider>
		</NextUIProvider>
	);
}