import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

// export function generateStaticParams() {
// 	return [{ duration: 'short' }, { duration: 'hours' }, { duration: 'long' }, { duration: 'night' }]
// }

export default async function Page({
	params: { lang }
}: {
	params: { lang: Language, duration: string }
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