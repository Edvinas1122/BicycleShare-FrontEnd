"use client";
import {
	Skeleton
} from "@nextui-org/react";


export default function SkeletonLoad({ lineCount = 20 }) {
	return (
		<div className="flex flex-col">
			{Array.from({ length: lineCount }).map((_, index) => (
				<Skeleton
					key={index}
					className={`h-3 w-${(index % 2) === 0 ? "3/5" : "4/5"} rounded-lg
					${(index % 2) === 0 ? "ml-2" : "ml-4"} my-2
					`}
				/>
			))}
		</div>
	);
}