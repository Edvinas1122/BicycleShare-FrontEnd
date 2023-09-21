import { LoginCardProps } from "@/app/@auth/components/LoginCard";

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
	return authCredentials.oAuth2;
}

export const getLoginLink = () => {
	return process.env.NEXT_PUBLIC_OAUTH_LINK
}