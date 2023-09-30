import { Language } from '@/conf/dictionary.conf';
import { redirect, RedirectType } from "next/navigation"

export default function Page({
	searchParams: {press},
	params: {lang, id},
}: {
	searchParams: {press: string};
	params: {lang: Language, id: string};
}) {
	const path = "/" + lang + "/" + id + "/" + press;
	if (press) {
		redirect(path, RedirectType.replace);
	}
	return null;
}