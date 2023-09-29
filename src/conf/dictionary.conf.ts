type Dictionary = Readonly<{
	terms_conditions: string;
	accept_terms_conditions: string;
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
	question_length: string;
	select: string;
	confirm: string;
	affirmation: string;
	confirm_description: string;
	device_connection: string;
	available: string;
	unavailable: string;
	loading: string;
	back: string;
	language: string;
	comments: string;
}>

export type Term = keyof Dictionary;

const dictionary: Dictionary = {
	terms_conditions: "Terms & Conditions",
	accept_terms_conditions: "I accept the terms & conditions",
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
	question_length: "For how long do you want to reserve the bicycle?",
	select: "Select",
	confirm: "Confirm 📝🤝",
	affirmation: "I confirm 🤝",
	confirm_description: "Do you confirm the reservation?",
	device_connection: "Checking a device connection...",
	available: "available",
	unavailable: "unavailable",
	loading: "loading...",
	back: "Back",
	language: "Language",
	comments: "Comments",
};

const german_dictionary: Dictionary = {
	terms_conditions: "Allgemeine Geschäftsbedingungen",
	accept_terms_conditions: "Ich akzeptiere die Allgemeinen Geschäftsbedingungen",
	held_by: "Gehalten von",
	returned_by: "Zurückgegeben von",
	reserve: "Reservieren",
	last_users: "Letzte Nutzer",
	reserve_initial: "Reservieren",
	reserve_process_reassurance: "Sobald Sie bestätigen, folgen Sie den Anweisungen auf dem Bildschirm.",
	proceed: "Fortfahren",
	info: "Info 🔎",
	info_description: [
		"Machen Sie sich keine Sorgen, erst wenn Sie auf <'Ich bestätige 🤝'> klicken, gilt Ihre Reservierung als verbindlich.",
		"Zuvor geben Sie Ihre beabsichtigte Reservierungsdauer an.",
		"Danach wird angezeigt, wann Sie eine Taste am Schließfachgerät drücken müssen 👉🔘.",
		"Aber Sie müssen es innerhalb von 10 Sekunden tun. Das ist mehr als genug, wenn Sie neben dem Gerät stehen.",
		"Andernfalls wird die Reservierung neu gestartet. Aber keine Sorge, Sie können es sofort wieder versuchen.",
	],
	cancel: "Abbrechen",
	short: "Kurz 🤏",
	short_description: "Für eine kurze Fahrt zum Geschäft. Etwa eine Stunde.",
	hours: "Ein paar Stunden 🕑",
	hours_description: "Für einige Stunden, um irgendwo abzuhängen. Etwa 3 Stunden. Oder länger, wenn die Fahrräder nicht überbelegt sind.",
	long: "Länger ☀️",
	long_description: "Für einen längeren Zeitraum, je nach Situation. Wenn die Fahrräder nicht überbelegt sind, können Sie es für eine gerechtfertigt längere Zeit nutzen.",
	over_night: "Über Nacht 🌙",
	over_night_description: "Es ist jetzt Nacht, Sie können es über Nacht nutzen und morgens zurückgeben.",
	duration: "Wie lange ⌛",
	question_length: "Wie lange möchten Sie das Fahrrad reservieren?",
	select: "Auswählen",
	confirm: "Bestätigen 📝🤝",
	affirmation: "Ich bestätige 🤝",
	confirm_description: "Bestätigen Sie die Reservierung?",
	device_connection: "Geräteverbindung wird überprüft...",
	available: "verfügbar",
	unavailable: "nicht verfügbar",
	loading: "laden...",
	back: "Zurück",
	language: "Sprache",
	comments: "Kommentare",
};

type Dictionaries = Readonly<{
	en: Dictionary;
	de: Dictionary;
}>

export type Language = keyof Dictionaries;

export const dictionaries: Dictionaries = {
	en: dictionary,
	de: german_dictionary,
}

