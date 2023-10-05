import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

// export function generateStaticParams() {
// 	return [{ duration: 'short' }, { duration: 'hours' }, { duration: 'long' }, { duration: 'night' }]
// }

export default function Page({
	params: { lang }
}: {
	params: { lang: Language, duration: string }
}) {
	return (
		<div>
			Press the locker button
		</div>
	);
}