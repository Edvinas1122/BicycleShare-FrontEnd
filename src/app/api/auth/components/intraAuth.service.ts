interface OAuthInfo {
	client_id: string,
	client_secret: string,
	redirect_uri: string,
}

export class IntraAuth {
	private readonly oauthInfo: OAuthInfo;
	private userInfoEndpoint: string = 'https://api.intra.42.fr/v2/me';
	private url: string = 'https://api.intra.42.fr/oauth/token';
	constructor({
		client_id,
		client_secret,
		redirect_uri,
	}: OAuthInfo) {
		this.oauthInfo = {
			client_id,
			client_secret,
			redirect_uri,
		};
	}

	public async getAccessToken(code: string): Promise<any> {
		const options: RequestInit =
		{
			method: "POST",
			headers: { 'Content-Type': "application/json" },
			body: JSON.stringify(this.requestBody(code)),
		}
		const response = await fetch(this.url, options);
		if (response.status !== 200) {
			throw new Error("We had some issues regarding intra authorising us");
		}
		const json = await response.json();
		return json;
	}

	private requestBody(code: string) {
		return {
			grant_type: "authorization_code",
			client_id: this.oauthInfo.client_id,
			client_secret: this.oauthInfo.client_secret,
			redirect_uri: this.oauthInfo.redirect_uri,
			code: code,
		}
	}

	public async getUserInfo(access_token: string): Promise<IntraInfo> {
		const options: RequestInit =
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
		const response = await fetch(this.userInfoEndpoint, options);
		if (response.status !== 200) {
			throw new Error("There was an issue getting user info from intra");
		}
		const json = await response.json();
		return formatAddapter(json);
	}
}

interface IntraInfo { // partial user info just what we need
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	image: { 
		link: string,
		versions: {
			medium: string,
			micro: string,
		}
	};
	sucess?: boolean;
}

const formatAddapter = (intraInfo: IntraInfo) => {
	return {
		id: intraInfo.id,
		login: intraInfo.login,
		first_name: intraInfo.first_name,
		last_name: intraInfo.last_name,
		image: intraInfo.image,
		sucess: true,
	}
}