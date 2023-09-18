import {
	dictionaries,
} from "@/conf/dictionary.conf";
import 
	DurrationSelect
from "./durrationSelect";

export default function Page() {

	return (
		<div>
			<h1 className="text-xl font-bold">
				{dictionaries.en.duration}
			</h1>
			<p>
				{dictionaries.en.question_lenght}
			</p>
			<div className={"flex flex-col w-full justify-center"}>
				<DurrationSelect />
			</div>
		</div>
	);
}
