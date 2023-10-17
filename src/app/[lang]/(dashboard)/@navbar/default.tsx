import Navbar, {UserMenu, LogoutButton} from "./Navbar";
import { appLoginConfig } from '@/conf/organisation.conf';
import { dictionaries, Language, languages } from "@/conf/dictionary.conf";
import { revalidateTag } from 'next/cache';
import { StatefulButton } from "@/app/components/buttons";
import { redirect, RedirectType } from "next/navigation";
import { getUserFromHeaders } from "@/components/next-api-utils/validation";
import { getServerSession } from "next-auth/next";

export default async function Page({
	params: {lang}
}: {
	params: {lang: Language}
}) {
	const session = await getServerSession();

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

	async function selectUkranian() {
		"use server"
		redirect("/ue", RedirectType.replace);
	}

	const languageMenuItem = (
		<>
		  <p>{dictionaries[lang].language}</p>
		  <StatefulButton action={selectEnglish}>{"🇬🇧"}</StatefulButton>
		  <StatefulButton action={selectGerman}>{"🇩🇪"}</StatefulButton>
		  <StatefulButton action={selectUkranian}>{"🇺🇦"}</StatefulButton>
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

	const logoutButton = (
		<LogoutButton>
			{dictionaries[lang].logout}
		</LogoutButton>
	);

	return (
		<>
			<Navbar
				icon={appLoginConfig.icon}
				title={appLoginConfig.title}
			>
				{/* {session.user as string} */}
				{/* <UserMenu user={session.user}
					menuItems={[
						languageMenuItem,
						cacheMenuItem,
						logoutButton
					]}>
				</UserMenu> */}
			</Navbar>
		</>
	);
}