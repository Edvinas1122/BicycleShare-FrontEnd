import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers';
import { respondError } from './endpoints';

const secret: string = "cat";

// export const validateToken = (
// 	token: string,
// 	secret_param?: string
// ): any => {
// 	try {
// 		const decoded = jwt.verify(token, secret_param ? secret_param : secret)
// 		return decoded
// 	} catch (e) {
// 		console.log("token validation error", e);
// 		return false
// 	}
// }

export const validateToken = async (token: string): Promise<any> => {
    try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(secret),
		);
		return verified.payload;
    } catch (e) {
        console.log("token decryption error", e);
        return false;
    }
}

export const generateToken = async (user: any) => {
	const tokenKey = await new SignJWT({
		...user
	})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(secret));

    return tokenKey;
}

export const hasAVaildToken = (): boolean => {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	const decoded = token ? validateToken(token.value): false;
	const hasValidToken = decoded ? true : false;
	return hasValidToken;
}

export const hasAcceptedTerms = async (): Promise<boolean> => {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	const hasValidToken = token ? await validateToken(token.value): false;
	if (!hasValidToken) {
		return false;
	}
	return hasValidToken.termsAccepted;
}

export const getUserFromToken = async (): Promise<any> => {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	if (!token) {
		throw new Error("Missing token");
	}
	const decoded = validateToken(token.value);
	return decoded;
}

export class Token {
	private token: any;
	private tokenDecoded: string | null;
	constructor() {
		const cookieStore = cookies();
		this.token = cookieStore.get('token');
		this.tokenDecoded = null;
	}

	private async hasValidTokenP(): Promise<boolean> {
		if (this.tokenDecoded) {
			return true;
		}
		if (!this.token) {
			throw new Error("Missing token");
		}
		const decoded = await validateToken(this.token);
		if (!decoded) {
			return false;
		}
		if (this.tokenDecoded === null) {
			this.tokenDecoded = decoded;
		}
		return true;
	}

	public async hasAVaildToken(): Promise<boolean> {
		const hasValidToken = this.token ? await this.hasValidTokenP(): false;
		return hasValidToken;
	}

	public async hasAcceptedTerms(): Promise<boolean> {
		if (!await this.hasValidTokenP()) {
			return false;
		}
		const decoded = this.tokenDecoded ? this.tokenDecoded : await validateToken(this.token);
		return decoded.termsAccepted;
	}

	public async getUserFromToken(adapter: Function): Promise<any> {
		const decoded = this.tokenDecoded ? this.tokenDecoded : await validateToken(this.token);
		return adapter(decoded);
	}

	public async updateUserToken(property: string, value: any): Promise<void> {
		const decoded = this.tokenDecoded ? this.tokenDecoded : await validateToken(this.token);
		decoded[property] = value;
		delete decoded.exp;
		const newToken = await generateToken(decoded);
		cookies().delete('token');
		cookies().set('token', newToken);
	}
}

import { headers } from 'next/headers';

export function getUserFromHeaders(){
	const headersList = headers();
	const user = {
		id: headersList.get('x-user-id'),
		image: headersList.get('x-user-image'),
		name: headersList.get('x-user-name'),
		username: headersList.get('x-user-username')
	};
	if (user.name === "error") throw new Error("Missing token");
	return user;
}

