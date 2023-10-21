import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {
	Buttons,
	QueryButtonProps
} from "@/app/components/srv-buttons";

export default function Page({
	params: {lang, id},
}: {
	params: {lang: Language, id: string};
}) {

	const buttons: QueryButtonProps[] = [
		{
			label: dictionaries[lang].select,
			route: "",
			props: {
				color: "primary",
			},
			params: "time",
			defaultState: "short",
			type: "query",
		},
	];

	const currentPath = `/${lang}/${id}/select/duration/`;

	return (
		<>
			<Buttons
				buttons={buttons}
				currentPath={currentPath}
			/>
		</>
	);
}