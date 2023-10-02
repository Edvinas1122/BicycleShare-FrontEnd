import 
	constructBicycleService,
	{ constructUserService }
from "@/components/bicycle-api/bicycle.module";

import
	NotionPageData
from "@/components/notion-views/NotionPage";

import
	{getUserFromToken, Token}
from "@/components/next-api-utils/validation";
import {
	dictionaries, Language
} from "@/conf/dictionary.conf";

import { LoginButton } from "../components/LoginButton";
import { redirect, RedirectType } from 'next/navigation';

export default async function Page({
	params: {lang},
}: {
	params: {lang: Language};
}) {

	const bicycleService = constructBicycleService({next: {tags: ["terms"]}});
	const termsAndConditions = await bicycleService.getTermsAndConditions();

	const acceptTermsAndConditions = async () => {
		"use server";
		const service = constructUserService({cache: 'no-store'});
		const token = new Token()
		const user = await token.getUserFromToken((any: any) => (any));
		const userInterface = service.getUserInterface(user);
		const res = await userInterface.acceptTermsAndConditions();
		if (res.status == 200) {
			await token.updateUserToken("termsAccepted", true);
			redirect('/');
		}
	}

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