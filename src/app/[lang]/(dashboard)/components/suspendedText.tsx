"use client";
import React, {use, Suspense} from "react";

const PromisedText = ({
	promisedText,
}: {
	promisedText: Promise<string>,
}) => {
	const data = use(promisedText);
	// console.log(data);
	return <>{data}</>;
}

const SuspendedText = ({
	fallback,
	promisedText,
}: {
	fallback: string,
	promisedText: Promise<string>,
}) => {
	return (
		<Suspense fallback={<>{fallback}</>}>
			<PromisedText
				promisedText={promisedText}
			/>
		</Suspense>
	);
}

export default SuspendedText;