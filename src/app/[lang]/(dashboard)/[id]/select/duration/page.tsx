import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import 
	DurrationSelect
from "./durrationSelect";

export default function Page({params: {lang}}: {params: {lang: Language}}) {

	return (
		<div>
			<h1 className="text-xl font-bold">
				{dictionaries[lang].duration}
			</h1>
			<p>
				{dictionaries[lang].question_length}
			</p>
			<div className={"flex flex-col w-full justify-center"}>
				<DurrationSelect 
					language={lang}
				/>
			</div>
		</div>
	);
}
