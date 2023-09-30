import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import{
	TableFrame
} from "./userTable";

type Timestamp = {
	taken: string,
	returned: string,
	user: string,
};

// const timestamps: Timestamp[] = [
// 	{
// 		end: "2021-10-10",
// 		start: "2021-10-11",
// 		user: "John Doe",
// 	}
// ]

export default async function Page({ 
	params 
}: { 
	params: { id: string } 
}) {

	async function getTimestamps(iteration: number) {
		"use server";
		const service = constructBicycleService({cache: 'no-store'});
		// const service = constructBicycleService({next: {tags: [`bicycle-use-${params.id}`]}});
		const bicycle = await service.getBicycleInterface(Number(params.id));
		if (!bicycle) return null;
		const timestamps = await bicycle.getLastUses(iteration);
		const times = await Promise.all(timestamps);
		return times;
	}

	const headings = [
		{
			key: `name`,
			label: `Who`,
		},
		{
			key: `start`,
			label: `took`,
		},
		{
			key: `end`,
			label: `returned`,
		},
	];
	return (
		<div>
			<TableFrame
				headings={headings}
				getTimestamps={getTimestamps}
			/>
		</div>
	);
}
