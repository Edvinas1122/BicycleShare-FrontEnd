import { BicycleCardSkeleton } from "../components/BicycleCard"

export default function Loading() {
	const skeletons = ([...Array(3)].map((e, i) => <BicycleCardSkeleton key={i} transparency={45 - i * 5} />));
	return (
		<>
			{skeletons}
		</>
	);
}