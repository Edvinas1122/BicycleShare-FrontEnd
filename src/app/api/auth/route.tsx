import {
	authCredentials
} from '@/conf/organisation.conf';
import {
	IntraAuth
} from './components/intraAuth.service';
import {
	generateToken
} from '@/app/components/token.service';
import {
	QueryParameter,
	respondSetCookies
} from '@/components/next-api-utils/endpoints';

async function routeHandler(code: string) {
	const oAuth = new IntraAuth(authCredentials.oAuth2);
	const intra_token = await oAuth.getAccessToken(code);
	const user = await oAuth.getUserInfo(intra_token.access_token);
	const token = generateToken(user);
	return respondSetCookies({message: user}, token, 200);
}

export const GET = QueryParameter('code', routeHandler);
