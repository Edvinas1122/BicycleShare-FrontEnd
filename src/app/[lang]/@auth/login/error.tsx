"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
	const router = useRouter();
	useEffect(() => {
		console.error(error)
		setTimeout(() => {
			// router.replace('/login');
			window.location.replace('/login');
		}, 1000);
	}, [error])
	return (
		<>
			<p className="text-red-500 text-center">
				{`${error}`}
			</p>
		</>
	);
}