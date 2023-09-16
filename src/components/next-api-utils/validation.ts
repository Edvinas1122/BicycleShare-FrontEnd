import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { respondError } from './endpoints';

const secret: string = "cat";

export const validateToken = (
	token: string,
	secret_param?: string
) => {
	try {
		const decoded = jwt.verify(token, secret_param ? secret_param : secret)
		return decoded
	} catch (e) {
		console.log("token validation error", e);
		return false
	}
}

export const generateToken = (
	user: any
) => {
	const token = jwt.sign(user, secret, {
		expiresIn: '1h'
	})
	return token
}

export const hasAVaildToken = (): boolean => {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	const hasValidToken = token ? validateToken(token.value): false;
	return hasValidToken;
}

export const hasAcceptedTerms = (): boolean => {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	const hasValidToken = token ? validateToken(token.value): false;
	if (!hasValidToken) {
		return false;
	}
	console.log("hasValidToken", hasValidToken);
	return hasValidToken.termsAccepted;
}

export const getUserFromToken = async (): Promise<any> => {
	const cookieStore = cookies();
	const token = cookieStore.get('token');
	const decoded = validateToken(token.value);
	return decoded;
}

export class Token {
	private token: any;
	constructor() {
		const cookieStore = cookies();
		this.token = cookieStore.get('token');
	}

	public hasAVaildToken(): boolean {
		const hasValidToken = this.token ? validateToken(this.token.value): false;
		return hasValidToken;
	}

	public hasAcceptedTerms(): boolean {
		if (!this.hasAVaildToken()) {
			return false;
		}
		const decoded = validateToken(this.token.value);
		return decoded.termsAccepted;
	}

	public getUserFromToken(): any {
		const decoded = validateToken(this.token.value);
		return decoded;
	}

	public updateUserToken(property: string, value: any): void {
		const decoded = validateToken(this.token.value);
		decoded[property] = value;
		delete decoded.exp;
		const newToken = generateToken(decoded);
		cookies().delete('token');
		cookies().set('token', newToken);
	}
}

export function ValidateToken(tokenToValidate: string, routeHandler: Function): Function
{
	return async function (request: Request): Promise<Response> {
		const cookieStore = cookies();
		const token = cookieStore.get('token');
		if (!token) {
			return respondError("Missing token", 401);
		}
		const decoded = validateToken(token.value, tokenToValidate);
		if (!decoded) {
			return respondError("Invalid token", 401);
		}
		return await routeHandler(request);
	}
}
