import BicycleCard from "./components/BicycleCard";
import constructBicycleService from "@/components/bicycle-api/bicycle.module";

export default async function Page() {

	const bicycleService = constructBicycleService({next: {tags: ["bicycle"]}});
	const bicycles = await bicycleService.getBicycles();

	console.log(bicycles);
	return (
		<div className="pop-appear">
			{bicycles.map((bicycle) => (
				<BicycleCard
					props={bicycle}
				/>
			))}
		</div>
	);
}