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
	return hasValidToken ? true: false;
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
