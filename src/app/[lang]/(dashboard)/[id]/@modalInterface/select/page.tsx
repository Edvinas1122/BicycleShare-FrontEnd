import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {Buttons, ButtonProps} from "@/app/components/buttons";

export default function Page({
	params: {lang, id},
}: {
	params: {lang: Language, id: string};
}) {

	const buttons: ButtonProps[] = [
		{
			label: dictionaries[lang].info,
			route: "info",
			props: {
				color: "primary",
				variant: "ghost",
			}
		},
		{
			label: dictionaries[lang].proceed,
			route: "duration",
			props: {
				color: "primary",
			}
		},
	];

	const currentPath = `/${lang}/${id}/select/`;

	return (
		<>
			<Buttons
				buttons={buttons}
				lang={lang}
				currentPath={currentPath}
			/>
		</>
	);
}