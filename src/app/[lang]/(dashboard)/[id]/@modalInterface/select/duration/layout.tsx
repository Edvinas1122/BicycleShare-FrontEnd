import {Buttons, QueryButtonProps} from "@/app/components/srv-buttons";
import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import {ButtonProps} from "@/app/components/srv-buttons";
import {BackButton} from "@/app/components/buttons";


export default function Layout({
	children,
	params: {lang},
}:{
	children: React.ReactNode;
	params: {lang: Language};
}){

	return (
		<>
			<BackButton
				label={dictionaries[lang].back}
				props={{
					color: "primary",
					variant: "ghost",
				}}
			/>
			{children}
		</>
	);
}