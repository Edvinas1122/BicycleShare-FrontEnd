import { BicycleCardSkeleton } from "../components/BicycleCard"

export default function Loading() {
	const skeletons = ([...Array(4)].map((e, i) => <BicycleCardSkeleton key={i} transparency={45 - i * 5} />));

	return (
		<>
			{skeletons}
		</>
	);
}