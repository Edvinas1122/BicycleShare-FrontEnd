import { BicycleCardSkeleton } from "../components/BicycleCard"

export default function Loading() {
	const skeletons = ([...Array(3)].map((e, i) => <BicycleCardSkeleton key={i} transparency={45 - i * 5} />));

	const dashBoardFrameStyle = "w-full h-full items-center justify-start h-[100vh] w-[100vw] flex flex-col gap-4";
	return (
		<div className={dashBoardFrameStyle}>
			{skeletons}
		</div>
	);
}