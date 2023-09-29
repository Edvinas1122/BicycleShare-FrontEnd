import {
	Language
} from "@/conf/dictionary.conf";

import { appLoginConfig } from '@/conf/organisation.conf';
import { QuoteCollection } from "../components/QuoteCollection";

export default function Layout({
	children,
	params
}: {
	children: React.ReactNode;
	params: {lang: Language};
}) {
	
	return (
		<>
			<div className="flex flex-col justify-center items-center h-full gap-4">
				<QuoteCollection
					quotes={appLoginConfig.descriptionCollection[params.lang]}
				/>
				{children}
			</div>
		</>
	);
}