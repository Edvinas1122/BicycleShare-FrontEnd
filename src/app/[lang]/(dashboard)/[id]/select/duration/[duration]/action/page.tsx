import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock
} from "./Unlock";

export default async function Page({
	params: { lang, id, duration }
}: {
	params: { lang: Language, duration: string, id: string }
}) {
	return (
		<Unlock
			bicycle_id={id}
			duration={duration}
		>
			<div>
				Press the locker button
			</div>
		</Unlock>
	);
}