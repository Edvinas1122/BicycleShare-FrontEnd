"use client";

import {ScrollShadow} from "@nextui-org/react";
import {Suspense} from "react";
import Loading from "../@bicycles/loading";
import {useScrollContext} from "./NavbarRef";

const BicycleListWrapper = ({
	children,
}: {
	children: React.ReactNode
}) => {

	const { containerRef } = useScrollContext();
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
			ref={containerRef}
			style={{
				transform: "translateY(-32px)",
				paddingTop: "54px",
				paddingBottom: "48px",
			}}
		>
			<Suspense fallback={<Loading/>}>
			{children}
			</Suspense>
		</ScrollShadow>
	);
};

export default BicycleListWrapper;