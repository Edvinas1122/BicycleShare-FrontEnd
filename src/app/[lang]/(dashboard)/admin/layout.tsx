import { headers } from "next/headers";
import DisplayModal from "@/app/components/simple_modal";
import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";

export default async function Layout({
	children,
	params: {lang}
}:{
	children: React.ReactNode;
	params: {lang: Language};
}){
	const headers_list = headers();
	const user_id = headers_list.get("x-user-id");
	console.log("user_id", user_id);

	return (
		<>
			<DisplayModal>
			{children}
			</DisplayModal>
		</>
	);
}
