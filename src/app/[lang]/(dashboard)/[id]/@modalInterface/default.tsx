// import {
// 	dictionaries,
// 	Language
// } from "@/conf/dictionary.conf";

// import {
// 	ModalInterface, InterfaceUnit
// } from "@/app/components/modal";

export default function Page({
	// params: {lang},
}: {
	// params: {lang: Language};
}) {

	// async function startLockerOpenSequence(phrasedRequest: string) {
	// 	"use server";
	// 	console.log(phrasedRequest);
	// }

	// const modalInterface: InterfaceUnit[] = [
	// 	buttonBuild(
	// 		dictionaries[lang].last_users,
	// 		"/last-users", { levelAppearant: 0, buttonProps: {
	// 				color: "primary",
	// 				variant: "ghost",
	// 		}}),
	// 	buttonBuild(
	// 		dictionaries[lang].comments,
	// 		"/comments", { levelAppearant: 0, buttonProps: {
	// 				color: "primary",
	// 				variant: "ghost",
	// 		}}),
	// 	buttonBuild(
	// 		dictionaries[lang].select,
	// 		"/select", { levelAppearant: 0}),
	// 	buttonBuild(
	// 		dictionaries[lang].back,
	// 		"../", { levelAppearant: 2, buttonProps: {
	// 			color: "primary",
	// 			variant: "ghost",
	// 		}}),
	// 	buttonBuild(
	// 		dictionaries[lang].info,
	// 		"/info", { levelAppearant: 1, buttonProps: {
	// 			color: "primary",
	// 			variant: "ghost",
	// 		}}),
	// 	buttonBuild(
	// 		dictionaries[lang].proceed,
	// 		"/duration", { levelAppearant: 1}),
	// 	buttonBuild(
	// 		dictionaries[lang].select,
	// 		"/short", { 
	// 			levelAppearant: 2,
	// 			segmentDemandant: "duration",
	// 			state: "time",
	// 		}),
	// 	buttonBuild(
	// 		dictionaries[lang].back,
	// 		"../", { levelAppearant: 3, buttonProps: {
	// 			color: "primary",
	// 			variant: "ghost",
	// 		}}),
	// 	buttonBuild(
	// 		dictionaries[lang].affirmation,
	// 		"", { 
	// 			levelAppearant: 3,
	// 			serverAction: startLockerOpenSequence
	// 		}),
	// ];

	return null;
		// <ModalInterface
		// 	interfaceItems={modalInterface}
		// />

}

// function buttonBuild(
// 	children: React.ReactNode,
// 	route: string,
// 	props: {
// 		levelAppearant?: number,
// 		segmentDemandant?: string,
// 		buttonProps?: {
// 			[key: string]: any;
// 		}
// 		serverAction?: Function,
// 		state?: string,
// 	}
// ) {
// 	const persistent = (props.levelAppearant === undefined);
// 	const close = route === "/" ? true : false;
// 	const buttonProps = props.buttonProps ? props.buttonProps : {
// 		color: "primary"
// 	};
// 	const back = route === "../" ? true : false;
// 	return {
// 		buttonChildren: children,
// 		route: route,
// 		close: close,
// 		back: back,
// 		persistent: persistent,
// 		levelAppearant: props.levelAppearant,
// 		segmentDemandant: props.segmentDemandant,
// 		buttonProps: buttonProps,
// 		serverAction: props.serverAction,
// 		state: props.state,
// 	}
// }