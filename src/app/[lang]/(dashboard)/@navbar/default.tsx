import Navbar, {UserMenu} from "./Navbar";
import { appLoginConfig } from '@/conf/organisation.conf';
import { dictionaries, Language } from "@/conf/dictionary.conf";
import { headers } from "next/headers";


export default function Page({params: {lang}}: {params: {lang: Language}}) {

	const headersList = headers();
	const user = {
		image: headersList.get('x-user-image'),
		name: headersList.get('x-user-name'),
		username: headersList.get('x-user-username')
	};
	if (user.name === "error") return null;
	if (!dictionaries[lang]) return null;
	return (
		<>
			<Navbar
				icon={appLoginConfig.icon}
			>
				<UserMenu user={user}>
					<p>{dictionaries[lang].language}</p>
				</UserMenu>
			</Navbar>
		</>
	);
}