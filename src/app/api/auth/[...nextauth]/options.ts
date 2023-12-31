import type {NextAuthOptions} from 'next-auth'
import FortyTwoProvider, {UserData} from "next-auth/providers/42-school";
import 
	{ constructUserService }
from "@/components/bicycle-api/bicycle.module";
// import CredentialsProvider from "next-auth/providers/credentials";

async function checkDatabase(user: any) {
	const userService = constructUserService({cache: 'no-store'});
	const [userOnNotion, ownership] = await Promise.all([
		userService.getUserByIntraID(user.id),
		userService.userOwnsBicycle(user.id)
	]);
	const userWithInfo = {
		...user,
		termsAccepted: userOnNotion ? true : false,
		ownership: ownership,
		role: userOnNotion?.role,
	}
	return userWithInfo;
}

export const options: NextAuthOptions = {
	providers: [
		FortyTwoProvider({
			clientId: process.env.OAUTH_CLIENT_ID as string,
			clientSecret: process.env.OAUTH_CLINET_SECRET as string,
		}),
	],
	pages: {
		signIn: '/login', // middleware locale
		signOut: '/logout', // middleware locale
		error: '/error', // middleware locale
	},
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }: { 
			token: any; 
			user: any; 
			account: any; 
			profile?: any; 
			isNewUser?: boolean;
		}) {
			const foutryTwoProfile = profile as any;
			token = consumeToToken(foutryTwoProfile, token);
			token = await checkDatabase(token);
			return token;
		},
		async session({ session, token, user }: {
			session: any;
			token: any;
			user: any;
		}) {
			session.user = token;
			return session;
		},
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			console.log("redirect callback", url, baseUrl);
			return baseUrl;
		}
	}
}

function consumeToToken(profile: any, token: any) {
	const image = profile.image ? 
		profile.image.versions.small as string : "";
	const newPayload = {
		...token,
		image: image,
		id: profile.id,
		login: profile.login,
	}
	return newPayload;
}