"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginError } from "./components/intraAuth.service";
import { PopUp } from "@/app/components/notifications";
import { clientDictionaries } from '@/conf/dictionary.conf';

export default function Error({
	error,
	reset,
}: {
	error: LoginError,
	reset: () => void
}) {
	const router = useRouter();
	useEffect(() => {
		const cleanup = setTimeout(() => {
			window.location.replace("/login");
		}, 5000);
		return () => {
			clearTimeout(cleanup);
		}
	}, [error, router])
	return (
		<>
		<PopUp duration={4300}>
			<p className={"text-sm"}>
				{"Aw snape error..! We might need to update our intra stuff...!"}
			</p>
		</PopUp>
		</>
	);
}
