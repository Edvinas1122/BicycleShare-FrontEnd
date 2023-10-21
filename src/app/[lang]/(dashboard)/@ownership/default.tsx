import { headers } from "next/headers";
import BicycleCard, {
	UserAvatar,
	UserSkeleton,
	ImageSuspense,
	ImageSkeleton,
	LinkButton
} from "../components/BicycleCard";
import { LendController } from "../components/InterfaceCard";
import { Language, dictionaries } from "@/conf/dictionary.conf";

export default async function Page({params: {lang}}: {params: {lang: Language}}) {

	const headers_list = headers();
	const bicycle_owned_str = headers_list.get("x-bicycle_owned") as string;
	const bicycle_owned = JSON.parse(bicycle_owned_str);
	const bicycle_id = bicycle_owned.bicycle_id;
	const bicycle_name = bicycle_owned.bicycle_name;
	const owned_since = bicycle_owned.since;
	const intendedDuration = bicycle_owned.intendedDuration;
	console.log(bicycle_owned);

	return (
		<>
			<LendController 
				props={{
					unlock: "Unlock",
					return: "Return",
					bicycle_id: bicycle_id,
				}}
			/>
		</>
	);
}