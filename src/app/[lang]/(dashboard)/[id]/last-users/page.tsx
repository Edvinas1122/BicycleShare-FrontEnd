import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import{
	TableFrame
} from "./userTable";
import{
	Language, dictionaries
} from "@/conf/dictionary.conf";

export default async function Page({ 
	params 
}: { 
	params: { id: string, lang: Language } 
}) {

	async function getTimestamps(iteration: number) {
		"use server";
		// const service = constructBicycleService({cache: 'no-store'});
		const service = constructBicycleService({next: {tags: [`bicycle-use-${params.id}`]}});
		const bicycle = await service.getBicycleInterface(Number(params.id));
		if (!bicycle) return null;
		const timestamps = await bicycle.getLastUses(iteration);
		const times = await Promise.all(timestamps);
		return times;
	}

	const headings = [
		{
			key: `name`,
			label: dictionaries[params.lang].who,
		},
		{
			key: `start`,
			label: dictionaries[params.lang].took,
		},
		{
			key: `end`,
			label: dictionaries[params.lang].returned,
		},
	];
	return (
		<>
			<TableFrame
				headings={headings}
				getTimestamps={getTimestamps}
			/>
		</>
	);
}
