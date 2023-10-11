import
	NotionPageData
from "@/components/notion-views/NotionPage";
import {
	dictionaries, Language
} from "@/conf/dictionary.conf";

import { LoginButton } from "../components/LoginButton";
import {
	getTermsAndConditions,
	acceptTermsAndConditions
} from "../layout";

export default async function Page({
	params: {lang},
}: {
	params: {lang: Language};
}) {

	const termsAndConditions = await getTermsAndConditions();
	return (
		<>
			<NotionPageData
				list={termsAndConditions}
			/>
			<div className={"flex justify-center"}>
				<LoginButton handleLogin={acceptTermsAndConditions}>
					{dictionaries[lang].accept_terms_conditions}
				</LoginButton>
			</div>
		</>
	)
}