import { LoginCardProps } from "@/app/@auth/components/LoginCard";

export const appLoginConfig: LoginCardProps = {
	icon: "/bike_icon.svg",
	title: "42 Bicycle Share",
	organization: "42 Wolfsburg",
	description: "An application for journaling Bicycle Share",
	descriptionCollection: [
		"An application for journaling Bicycle Share usage",
		"Easily keep an eye on where the bikes are",
		"Makes bicycles available to every student",
		"Awarded for winning the 42 Wolfsburg Ride It Hackathon in 2022",
	],
	buttonText: "Login with 42 Intra",
	devLink: "https://github.com/Edvinas1122/BicycleShare-FrontEnd",
	devLinkText: "About the Project"
};

export const authCredentials = {
	oAuth2: {
		link: process.env.NEXT_PUBLIC_OAUTH_LINK || "",
		client_id: process.env.OAUTH_CLIENT_ID || "",
		client_secret: process.env.OAUTH_CLINET_SECRET || "",
		redirect_uri: process.env.OAUTH_REDIRECT_URI || "",
	}
};