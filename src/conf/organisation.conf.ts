import { LoginCardProps } from "@/app/[lang]/@auth/components/LoginCard";

export const appLoginConfig: LoginCardProps = {
	icon: "/bike_icon.svg",
	title: "42 Bicycle Share",
	organization: "42 Wolfsburg",
	devLink: "https://github.com/Edvinas1122/BicycleShare-FrontEnd",
	description: "An application for journaling Bicycle Share",
	descriptionCollection: {
		"en": [
			"An application for journaling Bicycle Share usage",
			"Easily keep an eye on where the bikes are",
			"Makes bicycles available to every student",
			"Awarded for winning the 42 Wolfsburg Ride It Hackathon in 2022",
		],
		"de": [
			"Eine Anwendung zur Protokollierung der Nutzung von Bicycle Share",
			"Behalten Sie leicht im Auge, wo sich die Fahrräder befinden",
			"Stellt Fahrräder für jeden Studenten zur Verfügung",
			"Ausgezeichnet für den Gewinn des 42 Wolfsburg Ride It Hackathon im Jahr 2022",
		],
	},
	buttonText: {"en": "Login with 42 Intra", "de": "Mit 42 Intra anmelden"},
	devLinkTexts: {"en": "About the Project", "de": "Über das Projekt"},
};


const authCredentials = {
	oAuth2: {
		link: process.env.NEXT_PUBLIC_OAUTH_LINK || "",
		client_id: process.env.OAUTH_CLIENT_ID || "",
		client_secret: process.env.OAUTH_CLINET_SECRET || "",
		redirect_uri: process.env.OAUTH_REDIRECT_URI || "",
	}
};

export const getOAuth2Config = () => {
	const oAuth2 = authCredentials.oAuth2;
	if (!oAuth2.link) throw new Error("No OAuth2 link");
	if (!oAuth2.client_id) throw new Error("No OAuth2 client id");
	if (!oAuth2.client_secret) throw new Error("No OAuth2 client secret");
	if (!oAuth2.redirect_uri) throw new Error("No OAuth2 redirect uri");
	return oAuth2;
}

export const getLoginLink = () => {
	const redirect_uri = process.env.NEXT_PUBLIC_OAUTH_LINK;
	if (!redirect_uri) throw new Error("No redirect uri");
	return redirect_uri;
}