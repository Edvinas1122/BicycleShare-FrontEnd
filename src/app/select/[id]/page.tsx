import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import
	SuspendedText
from "./suspendedText";

export default function Page({ 
	params 
}: { 
	params: { id: string } 
}) {

	const service = constructBicycleService({cache: 'no-store'});
	const bicycle = service.getBicycleInterface(Number(params.id));
	const bicycleName = bicycle.then((bicycle) => bicycle.data.Name.title[0].plain_text);

	return (
		<div>
				<p> 
					Are you sure you want to reserve <b>{<SuspendedText
						fallback="this bicycle"
						promisedText={bicycleName}
					/>}</b>?
				</p>
				<p>
					As you confirm, proceeed with enstructions on the screen.
				</p>
		</div>
	);
}