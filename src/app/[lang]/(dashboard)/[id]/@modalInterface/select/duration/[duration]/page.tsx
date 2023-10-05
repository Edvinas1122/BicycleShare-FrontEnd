import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {Buttons, ButtonProps, QueryButtonProps} from "@/app/components/srv-buttons";

export default function Page({
	params: {lang, id, duration},
}: {
	params: {lang: Language, id: string, duration: string};
}) {

	// const buttons: QueryButtonProps[] = [
	// 	{
	// 		label: dictionaries[lang].select,
	// 		route: "",
	// 		props: {
	// 			color: "primary",
	// 		},
	// 		params: "time",
	// 		defaultState: "short",
	// 		type: "query",
	// 	},
	// ];

	const buttons: ButtonProps[] = [
		{
			label: dictionaries[lang].confirm,
			route: "/action",
			props: {
				color: "primary",
			},
		},
	];

	const currentPath = `/${lang}/${id}/select/duration/${duration}`;

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