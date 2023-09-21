import Login from "./Login";
import { appLoginConfig } from '@/conf/organisation.conf';

export default function Page({
	params: {lang}
}: {
	params: {lang: string}
}) {

	return (
		<Login
			lang={lang}
			appLoginConfig={appLoginConfig}
		/>
	);
}