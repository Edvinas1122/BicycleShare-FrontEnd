import { headers } from 'next/headers';
import Login from "./Login";

export default function Page() {
	// const headersList = headers()
	// const referer = headersList.get('referer');

	return (
		<Login 
		/>
	);
}
