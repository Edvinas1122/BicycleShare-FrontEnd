import BicycleCard from "../components/BicycleCard";
import constructBicycleService from "@/components/bicycle-api/bicycle.module";
import BicycleListWrapper from "../components/BicycleWrapper";
import { BicycleInfo } from "@/components/bicycle-api/content.service";
import { Language, dictionaries } from "@/conf/dictionary.conf";

export default async function Page({params: {lang}}: {params: {lang: Language}}) {
	// const bicycleService = constructBicycleService({cache: 'no-store'});
	const bicycleService = constructBicycleService({next: {tags: ["bicycle"]}});
	const bicycles: BicycleInfo[] | null = await bicycleService.getBicycles().catch(() => (null));

	const buttons = [
		{
			label: dictionaries[lang].reserve,
			route: "?press=select",
		},
		{
			label: dictionaries[lang].last_users,
			route: "?press=last-users",
		},
	];

	if (!bicycles) {
		return null;
	}

	return (
		<>
		{
			bicycles.map((bicycle) => (
				<BicycleCard
					key={bicycle.data.id}
					props={bicycle.data}
					user={bicycle.getLastUse()}
					imageLink={bicycle.getImageLink()}
					language={lang}
					buttons={buttons}
				/>
			))
		}
		</>
	);
}