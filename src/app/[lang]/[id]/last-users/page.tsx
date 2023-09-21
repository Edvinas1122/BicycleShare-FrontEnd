import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import
	PromiseTable
from "./userTable";

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

export default function Page({ 
	params 
}: { 
	params: { id: string } 
}) {

	const service = constructBicycleService({cache: 'no-store'});
	const bicycle = service.getBicycleInterface(Number(params.id));
	const timestampsPromise = bicycle.then((bicycle) => bicycle?.getLastUses());
	return (
		<div>
			<PromiseTable timestamps={timestampsPromise}/>
		</div>
	);
}
