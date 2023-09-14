import 
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import
	NotionPageData
from "@/components/notion-views/NotionPage";

export default async function Page() {

	const bicycleService = constructBicycleService({next: {tags: ["terms"]}});
	const termsAndConditions = await bicycleService.getTermsAndConditions();

	return (
		<>
			<NotionPageData list={termsAndConditions} />
		</>
	)
}