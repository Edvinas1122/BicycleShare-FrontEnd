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
		pop-appear
	`;
	const style = {
		overflowY: "auto",
		maxHeight: "100vh", 
		maxWidth: "100%", 
	};


	return (
		<ScrollShadow hideScrollBar isEnabled={false} className={bicycleListWrapperStyle} style={style}>
			<Suspense fallback={<Loading/>}>
			{children}
			</Suspense>
		</ScrollShadow>
	);
};

export default BicycleListWrapper;