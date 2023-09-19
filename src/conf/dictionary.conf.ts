type Dictionary = Readonly<{
	terms_conditions: string;
	held_by: string;
	returned_by: string;
	reserve: string;
	last_users: string;
	reserve_initial: string;
	reserve_process_reassurance: string;
	proceed: string;
	info: string;
	info_description: string[];
	cancel: string;
	short: string;
	short_description: string;
	hours: string;
	hours_description: string;
	long: string;
	long_description: string;
	over_night: string;
	over_night_description: string;
	duration: string;
	question_lenght: string;
	select: string;
	confirm: string;
	affirmation: string;
	confirm_description: string;
	device_connection: string;
	available: string;
	unavailable: string;
	loading: string;
	back: string;
}>

export type Term = keyof Dictionary;

const dictionary: Dictionary = {
	terms_conditions: "Terms & Conditions",
	held_by: "Held by",
	returned_by: "Returned by",
	reserve: "Reserve",
	last_users: "Last users",
	reserve_initial: "Reserve",
	reserve_process_reassurance: "As you confirm, proceed with instructions on the screen.",
	proceed: "Proceed",
	info: "Info 🔎",
	info_description: [
		"Do not worry, only when you do click <'I confirm 🤝'> then you are considered committed to a reservation.",
		"Before that you indicate your intended reservation duration.",
		"Afterwards it is highlighted, when to click a button on the locker device 👉🔘.",
		"But you must click it in 10 seconds. It is more than enough if you're standing next to the device.",
		"Otherwise, the reservation is restarted. But no worries, you can try instantly again.",
	],
	cancel: "Cancel",
	short: "Short 🤏",
	short_description: "For a short drive to a shop. Around an hour.",
	hours: "Few hours 🕑",
	hours_description: "For a few hours, to hang out somewhere. Around 3 hours. Or more, if bicycles are not over-occupied.",
	long: "Longer ☀️",
	long_description: "For a longer period, it's up to the situation. If bicycles are not over-occupied, you can use it for a justifiably longer time.",
	over_night: "Over night 🌙",
	over_night_description: "It's night now, you can use it for a night, and return it in the morning.",
	duration: "How long ⌛",
	question_lenght: "For how long do you want to reserve the bicycle?",
	select: "Select",
	confirm: "Confirm 📝🤝",
	affirmation: "I confirm 🤝",
	confirm_description: "Do you confirm the reservation?",
	device_connection: "Checking a device connection...",
	available: "available",
	unavailable: "unavailable",
	loading: "loading...",
	back: "Back",
};

type Dictionaries = Readonly<{
	en: Dictionary;
}>

export type Language = keyof Dictionaries;

export const dictionaries: Dictionaries = {
	en: dictionary,
}

