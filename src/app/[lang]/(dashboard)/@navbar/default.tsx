import Navbar, {UserMenu} from "./Navbar";
import { appLoginConfig } from '@/conf/organisation.conf';
import { dictionaries, Language, languages } from "@/conf/dictionary.conf";
import { revalidateTag } from 'next/cache';
import { redirect, RedirectType } from "next/navigation";
import { getUserFromHeaders } from "@/components/next-api-utils/validation";

export default function Page({
	params: {lang}
}: {
	params: {lang: Language}
}) {

	if (!dictionaries[lang]) return null;

	async function dropCache() {
		"use server"
		revalidateTag("bicycle");
	}

	const user = getUserFromHeaders();
	async function changeLanguage(lang: Language) {
		"use server"
		redirect("/" + lang, RedirectType.replace);
	}

	function countryCodeToFlag(countryCode: string) {
		if (countryCode == "en") return ("🇬🇧");
		const codePoints = countryCode
			.toUpperCase()
			.split("")
			.map((char) => 127397 + char.charCodeAt(0));
		return String.fromCodePoint(...codePoints);
	}

	function makeLanguageLabels(languages: Language[]) {
		let labels = [];
		for (let language of languages) {
			labels.push({
				code: language,
				label: countryCodeToFlag(language),
			});
		}
		return labels;
	}
	const language_options = makeLanguageLabels(languages);

	const user_admin = user?.admin === "true";
	const currentPath = `/${lang}`;

	return (
		<>
			<Navbar
				icon={appLoginConfig.icon}
				title={appLoginConfig.title}
			>
				<UserMenu user={user}
					terms={{
						language: dictionaries[lang].language,
						logout: dictionaries[lang].logout,
						admin: dictionaries[lang].admin,
						open: dictionaries[lang].open,
					}}
					methods={{
						changeLanguage,
					}}
					options={{
						languages: language_options,
						selectedLanguage: lang,
						showAdmin: user_admin,
						link_prefix: currentPath,
					}}
				/>
			</Navbar>
		</>
	);
}