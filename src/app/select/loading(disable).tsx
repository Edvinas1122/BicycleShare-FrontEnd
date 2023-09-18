import LoadingSkeleton from "./loadingSkeleton";

export default function Loading() {

	const styleNames = `
	`;

	return (
		<>
			<LoadingSkeleton>
			<h1 className="text-xl font-bold">
				Loading...
			</h1>
			</LoadingSkeleton>
		</>
	);
}