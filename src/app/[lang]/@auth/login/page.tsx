import {
	appLoginConfig,
} from '@/conf/organisation.conf';
import { LoginButton } from "../components/LoginButton";
import { Language } from '@/conf/dictionary.conf';


export default async function Page({
	params: {lang},
}: {
	params: {lang: Language};
}) {
	return (
		<>
			<LoginButton>
				{appLoginConfig.buttonText[lang]}
			</LoginButton>
		</>
	);
}
