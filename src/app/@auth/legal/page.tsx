import 
	constructBicycleService,
	{ constructUserService }
from "@/components/bicycle-api/bicycle.module";

import
	ViewCard
from "./ViewCard";

import
	{getUserFromToken, Token}
from "@/components/next-api-utils/validation";
import
	{
		dictionaries
	}
from "@/conf/dictionary.conf";


export default function Page() {

	const bicycleService = constructBicycleService({next: {tags: ["terms"]}});
	const termsAndConditions = bicycleService.getTermsAndConditions();

	const acceptTermsAndConditions = async () => {
		"use server";
		const service = constructUserService({cache: 'no-store'});
		const token = new Token()
		const user = token.getUserFromToken();
		const userInterface = service.getUserInterface(user);
		const res = await userInterface.acceptTermsAndConditions();
		if (res.status == 200) {
			token.updateUserToken("termsAccepted", true);
		}
		return res;
	}

	return (
		<>
			<ViewCard
				headerContent={
					<h1>{dictionaries.en.terms_conditions}</h1>
				}
				bodyContent={
					termsAndConditions
				}
				action={
					acceptTermsAndConditions
				}
			/>
		</>
	)
}