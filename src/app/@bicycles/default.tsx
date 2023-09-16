import BicycleCard from "../components/BicycleCard";
import constructBicycleService from "@/components/bicycle-api/bicycle.module";
import BicycleListWrapper from "../components/BicycleWrapper";
import { BicycleInfo } from "@/components/bicycle-api/content.service";

export default async function Page() {
	// const bicycleService = constructBicycleService({cache: 'no-store'});
	const bicycleService = constructBicycleService({next: {tags: ["bicycle"]}});
	const bicycles: BicycleInfo[] = await bicycleService.getBicycles();
	return (
		<>
		{
			bicycles.map((bicycle) => (
				<BicycleCard
					key={bicycle.data.id}
					props={bicycle.data}
					user={bicycle.getLastUse()}
					imageLink={bicycle.getImageLink()}
				/>
			))
		}
		</>
	);
}