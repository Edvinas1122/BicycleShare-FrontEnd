import { Language } from '@/conf/dictionary.conf';
import { redirect, RedirectType } from "next/navigation"

export default async function Page({
	searchParams: {interact},
	params: {lang, id},
}: {
	searchParams: {interact: string};
	params: {lang: Language, id: string};
}) {
	const path = "/" + lang + "/" + id + "/select/" + interact;
	if (interact) {
		redirect(path, RedirectType.replace);
	}
	return null;
}