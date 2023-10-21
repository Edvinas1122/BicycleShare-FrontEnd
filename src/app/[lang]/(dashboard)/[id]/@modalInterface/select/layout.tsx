import { headers } from "next/headers"
import { Language } from "@/conf/dictionary.conf";

export default function Layout({
	borrow,
	back,
	params: {lang},
}:{
	borrow: React.ReactNode;
	back: React.ReactNode;
	params: {lang: Language};
}){

	const headers_list = headers();
	const bicycle_owned = headers_list.get("x-bicycle_owned");
	const display_ownership = bicycle_owned === "null" ? false : true;

	return (
		<>
			{display_ownership ? back : borrow}
		</>
	);
}