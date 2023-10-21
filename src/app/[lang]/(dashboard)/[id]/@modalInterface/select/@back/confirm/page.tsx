import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Buttons,
	ButtonProps
} from "@/app/components/srv-buttons";

export default function Page({
	params: {lang, id},
}: {
	params: {lang: Language, id: string};
}) {

	const buttons: ButtonProps[] = [
		{
			label: dictionaries[lang].proceed,
			route: "duration",
			props: {
				color: "primary",
			}
		},
	];

	const currentPath = `/${lang}/${id}/select/confirm/`;

	return (
		<>
			<Buttons
				buttons={buttons}
				currentPath={currentPath}
			/>
		</>
	)
}