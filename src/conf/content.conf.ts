import { ServiceConfig } from '@/components/bicycle-api/content.service';

export const configuration: ServiceConfig = {
	TERMS_CONDITIONS: process.env.TERMS_CONDITIONS_PAGE_ID,
	BICYCLES: process.env.BICYCLES_DATABASE,
	TIMESTAMPS: process.env.TIMESTAMPS_DATABASE,
	SIGNED_USERS_DATABASE: process.env.SIGNED_USERS_DATABASE,
	// HOW_TO_USE: process.env.TUTORIAL_PAGE_ID,
	// DEV: process.env.ROOT_PAGE_ID,
}

export const getConfiguration = () => {
	return configuration;
}