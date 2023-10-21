import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

export default async function Page({
	params: {lang},
}: {
	params: {lang: Language};
}) {


	return (
		<>
			<h1>{dictionaries[lang].affirmation}</h1>
			<p>Do you hearby affirm that you have put the key into the locker?</p>
		</>
	);
}