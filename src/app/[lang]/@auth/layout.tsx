import {
	Language
} from "@/conf/dictionary.conf";
import LoginCard from "./components/LoginCard";

import { appLoginConfig } from '@/conf/organisation.conf';

export default function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: {lang: Language};
}) {

	const cardClass = "min-w-[350px] max-w-[30vw] mx-auto loading min-h-[300px] max-h-[80vh]";
	// (pop_appear ? " pop-appear" : "");

	return (
		<>
			<LoginCard
				props={appLoginConfig}
				lang={params.lang}
				cardClass={cardClass}
			>
			{children}
			</LoginCard>
		</>
	);
}