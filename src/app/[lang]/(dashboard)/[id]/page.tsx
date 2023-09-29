"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Page() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const dirrect = searchParams.get("press");

	React.useEffect(() => {
		if (dirrect && dirrect.length > 0) {
			setTimeout(() => {
				router.replace(pathname + "/" + dirrect);
			}, 1);
		}
	}, [dirrect, pathname, router, searchParams]);

	return null;
}