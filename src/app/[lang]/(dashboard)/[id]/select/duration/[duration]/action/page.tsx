import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock
} from "./Unlock";

// export function generateStaticParams() {
// 	return [{ duration: 'short' }, { duration: 'hours' }, { duration: 'long' }, { duration: 'night' }]
// }

export default async function Page({
	params: { lang }
}: {
	params: { lang: Language, duration: string }
}) {
	return (
		<Unlock>
			<div>
				Press the locker button
			</div>
		</Unlock>
	);
}