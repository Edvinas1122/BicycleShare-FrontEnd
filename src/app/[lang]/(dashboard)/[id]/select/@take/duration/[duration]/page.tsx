import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

export default async function Page({
	params: { lang }
}: {
	params: { lang: Language }
}) {
	return (
		<div>
			<h1 className="text-xl font-bold">
				{dictionaries[lang].confirm}
			</h1>
			<p>
				{/* {params.duration} */}
				{dictionaries[lang].confirm_description}
			</p>
		</div>
	);
}