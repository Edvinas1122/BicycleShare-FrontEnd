import Navbar, {UserMenu} from "./Navbar";
import { appLoginConfig } from '@/conf/organisation.conf';
import { dictionaries, Language } from "@/conf/dictionary.conf";
import { revalidateTag } from 'next/cache';
import { StatefulButton } from "@/app/components/buttons";
import { redirect, RedirectType } from "next/navigation";
import { getUserFromHeaders } from "@/components/next-api-utils/validation";


export default function Page({params: {lang}}: {params: {lang: Language}}) {

	const user = getUserFromHeaders();
	if (user.name === "error") return null;
	if (!dictionaries[lang]) return null;

	async function dropCache() {
		"use server"
		revalidateTag("bicycle");
	}

	async function selectEnglish() {
		"use server"
		redirect("/en", RedirectType.replace);
	}

	async function selectGerman() {
		"use server"
		redirect("/de", RedirectType.replace);
	}

	const languageMenuItem = (
		<>
		  <p>{dictionaries[lang].language}</p>
		  <StatefulButton action={selectEnglish}>{"🇬🇧"}</StatefulButton>
		  <StatefulButton action={selectGerman}>{"🇩🇪"}</StatefulButton>
		</>
	);

	const cacheMenuItem = (
		<>
		  <p>{"Admin"}</p>
			<StatefulButton action={dropCache}>
				{dictionaries[lang].drop_cache}
			</StatefulButton>
		</>
	  );

	return (
		<>
			<Navbar
				icon={appLoginConfig.icon}
				title={appLoginConfig.title}
			>
				<UserMenu user={user}
					menuItems={[
							languageMenuItem,
							cacheMenuItem
					]}
				>
					{/* <StatefulButton
						action={dropCache}
					>
						{dictionaries[lang].drop_cache}
					</StatefulButton> */}
				</UserMenu>
			</Navbar>
		</>
	);
}