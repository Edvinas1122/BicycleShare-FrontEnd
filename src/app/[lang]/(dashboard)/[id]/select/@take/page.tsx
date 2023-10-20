import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

export default function Page({
	params: { lang }
}: {
	params: { lang: Language }
}) {
	return (
		<div>
			<h1 className="text-xl font-bold"> 
				{dictionaries[lang].reserve}
			</h1>
			<p>
				{dictionaries[lang].reserve_process_reassurance}
			</p>
		</div>
	);
}