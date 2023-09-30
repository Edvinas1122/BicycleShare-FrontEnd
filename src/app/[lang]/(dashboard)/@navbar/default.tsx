import Navbar, {UserMenu} from "./Navbar";
import { appLoginConfig } from '@/conf/organisation.conf';
import { dictionaries, Language } from "@/conf/dictionary.conf";
import { revalidateTag } from 'next/cache';
import { headers } from "next/headers";
import { StatefulButton } from "@/app/components/buttons";
import { redirect, RedirectType } from "next/navigation";


export default function Page({params: {lang}}: {params: {lang: Language}}) {

	const headersList = headers();
	const user = {
		image: headersList.get('x-user-image'),
		name: headersList.get('x-user-name'),
		username: headersList.get('x-user-username')
	};
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