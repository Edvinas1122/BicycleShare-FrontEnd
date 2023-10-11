import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import{
	TableFrame
} from "./userTable";
import{
	Language, dictionaries
} from "@/conf/dictionary.conf";
import{
	getTimestamps
} from "../../layout"

export default async function Page({ 
	params 
}: { 
	params: { id: string, lang: Language }
}) {

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
				bicycle_id={Number(params.id)}
			/>
		</>
	);
}
