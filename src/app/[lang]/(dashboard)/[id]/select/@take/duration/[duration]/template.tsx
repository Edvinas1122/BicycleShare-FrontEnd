"use client";
import Animation from "../../../../Animation";

export default function Template({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Animation>
			{children}
		</Animation>
	);
}