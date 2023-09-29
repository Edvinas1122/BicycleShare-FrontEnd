"use client";

import {ScrollShadow} from "@nextui-org/react";
import {Suspense} from "react";
import Loading from "../@bicycles/loading";

const BicycleListWrapper = ({
	children,
}: {
	children: React.ReactNode
}) => {

	const bicycleListWrapperStyle = `
		flex 
		flex-row 
		flex-wrap 
		justify-center 
		gap-4
		overflow-y-scroll
		max-h-screen 
		max-w-full 
	`;


	return (
		<ScrollShadow
			hideScrollBar
			isEnabled={false}
			className={bicycleListWrapperStyle}
		>
			<Suspense fallback={<Loading/>}>
			{children}
			</Suspense>
		</ScrollShadow>
	);
};

export default BicycleListWrapper;