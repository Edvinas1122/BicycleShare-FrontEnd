import jwt from 'jsonwebtoken';

const secret: string = "cat";

export const validateToken = (
	token: string
) => {
	try {
		const decoded = jwt.verify(token, secret)
		return decoded
	} catch (e) {
		console.log("here", e);
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