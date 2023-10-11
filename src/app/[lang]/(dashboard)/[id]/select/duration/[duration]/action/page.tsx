import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Unlock
} from "./Unlock";

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