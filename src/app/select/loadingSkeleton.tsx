"use client";
import React from "react";
import {Skeleton} from "@nextui-org/react";

export default function LoadingSkeleton({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-2 p-1">
			<Skeleton className="h-8 w-4/5 rounded-lg">
				{children}
			</Skeleton>
		</div>
	);
}