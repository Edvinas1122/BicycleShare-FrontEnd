import {
	getOAuth2Config
} from '@/conf/organisation.conf';
import {
	IntraAuth
} from './components/intraAuth.service';
import {
	generateToken
} from '@/components/next-api-utils/validation';
import 
	{ constructUserService }
from "@/components/bicycle-api/bicycle.module";
import {
	QueryParameter,
	respondSetCookies
} from '@/components/next-api-utils/endpoints';

async function routeHandler(code: string): Promise<any> {
	const IntraOAuth2 = getOAuth2Config();
	const oAuth = new IntraAuth(IntraOAuth2);
	const intra_token = await oAuth.getAccessToken(code);
	const user = await oAuth.getUserInfo(intra_token.access_token);

	// check database for if accepted terms
	const userService = constructUserService({cache: 'no-store'});
	const userOnNotion = await userService.getUserByIntraID(user.id);

	// generate authentificated or pre-authentificated token
	const userWithInfo = {...user, termsAccepted: userOnNotion ? true : false}
	const token = generateToken(userWithInfo);
	return respondSetCookies({message: userWithInfo}, token, 200);
}

export const GET = QueryParameter('code', routeHandler);