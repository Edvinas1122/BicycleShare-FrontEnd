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
	const bicycle_owned = headers_list.get("x-bicycle_owned");
	console.log(bicycle_owned);
	return (
		<>
			{/* <BicycleCard
				props={{
					lockerId: bicycle_owned.bicycle_id,
					name: bicycle_owned.bicycle_name,
					available: true,
				}}
				header={
					<ImageSuspense fallback={<ImageSkeleton />}>
						<UserAvatar />
					</ImageSuspense>
				}
			/> */}
			<LendController 
				props={{
					unlock: "Unlock",
					return: "Return",
				}}
			/>
		</>
	);
}