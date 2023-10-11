import {
	getOAuth2Config
} from '@/conf/organisation.conf';
import {
	IntraAuth
} from '../login/components/intraAuth.service';
import {
	generateToken
} from '@/components/next-api-utils/validation';

async function handleOAuth(
	code: string,
	databaseCheckmethod: (user: any) => Promise<any>
): Promise<any> {
	const IntraOAuth2 = getOAuth2Config();
	const oAuth = new IntraAuth(IntraOAuth2);
	const intra_token = await oAuth.getAccessToken(code);
	const user = await oAuth.getUserInfo(intra_token.access_token, {cache: 'no-store'});
	const userWithInfo = await databaseCheckmethod(user);
	const token = await generateToken(userWithInfo);
	return {message: userWithInfo, token: token, status: 200};
}

export default handleOAuth;