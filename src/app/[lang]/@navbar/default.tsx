import Navbar, {UserMenu} from "./Navbar";
import { appLoginConfig } from '@/conf/organisation.conf';
import { getUserFromToken } from '@/components/next-api-utils/validation';
import { dictionaries, Language } from "@/conf/dictionary.conf";

function formatUser(user: any) {
	const images_collection = user.image;
	if (images_collection?.versions) {
		const image = images_collection.versions.small;
		const name = user.login;
		const username = user.first_name + " " + user.last_name;
		return {
			image,
			name,
			username
		};
	}
	const image = "";
	const name = user.login;
	const username = user.first_name + " " + user.last_name;
	return {
		image,
		name,
		username
	};
}

export default function Page({params: {lang}}: {params: {lang: Language}}) {

	const user = getUserFromToken().then(formatUser);
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