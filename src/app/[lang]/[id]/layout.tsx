import DisplayModal, {InterfaceUnit} from "../../components/modal";
import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import { 
	ModalContentWrapper
} from "@/app/components/modal";

export default function Layout({
	children,
	header,
	device,
	params: {lang}
}:{
	children: React.ReactNode;
	header: React.ReactNode;
	device: React.ReactNode;
	params: {lang: Language};
}){

	async function startLockerOpenSequence(phrasedRequest: string) {
		"use server";
		console.log(phrasedRequest);
	}

	const modalInterface: InterfaceUnit[] = [
		buttonBuild(
			dictionaries[lang].cancel,
			"/", {
				buttonProps: {
					color: "danger",
					variant: "light",
				},
			}),
		buttonBuild(
			dictionaries[lang].last_users,
			"/last-users", { levelAppearant: 0, buttonProps: {
					color: "primary",
					variant: "ghost",
			}}),
		buttonBuild(
			dictionaries[lang].comments,
			"/comments", { levelAppearant: 0, buttonProps: {
					color: "primary",
					variant: "ghost",
			}}),
		buttonBuild(
			dictionaries[lang].select,
			"/select", { levelAppearant: 0}),
		buttonBuild(
			dictionaries[lang].back,
			"../", { levelAppearant: 2, buttonProps: {
				color: "primary",
				variant: "ghost",
			}}),
		buttonBuild(
			dictionaries[lang].info,
			"/info", { levelAppearant: 1, buttonProps: {
				color: "primary",
				variant: "ghost",
			}}),
		buttonBuild(
			dictionaries[lang].proceed,
			"/duration", { levelAppearant: 1}),
		buttonBuild(
			dictionaries[lang].select,
			"/short", { 
				levelAppearant: 2,
				segmentDemandant: "duration",
				state: "time",
			}),
		buttonBuild(
			dictionaries[lang].back,
			"../", { levelAppearant: 3, buttonProps: {
				color: "primary",
				variant: "ghost",
			}}),
		buttonBuild(
			dictionaries[lang].affirmation,
			"", { 
				levelAppearant: 3,
				serverAction: startLockerOpenSequence
			}),
	];


	return (
		<>
			<DisplayModal
				interfaceItems={modalInterface}
				closeRoute={"/" + lang}
			>
			<ModalContentWrapper
				headerContent={header}
			>
			<>
			{device}
			{children}
			</>
			</ModalContentWrapper>
			</DisplayModal>
		</>
	);
}


/*
	@description
	@params
	@children - the text to display on the button
	@route - the route to navigate to next 
		- (if "/" then close the modal)
		- if serverAction is not defined
	@props - the props to pass to the button
	@props.levelAppearant - the level of route to appear
	@props.buttonProps - the props to pass to the button
	@props.serverAction - the action to perform on the server
*/
function buttonBuild(
	children: React.ReactNode,
	route: string,
	props: {
		levelAppearant?: number,
		segmentDemandant?: string,
		buttonProps?: {
			[key: string]: any;
		}
		serverAction?: Function,
		state?: string,
	}
) {
	const persistent = (props.levelAppearant === undefined);
	const close = route === "/" ? true : false;
	const buttonProps = props.buttonProps ? props.buttonProps : {
		color: "primary"
	};
	const back = route === "../" ? true : false;
	return {
		buttonChildren: children,
		route: route,
		close: close,
		back: back,
		persistent: persistent,
		levelAppearant: props.levelAppearant,
		segmentDemandant: props.segmentDemandant,
		buttonProps: buttonProps,
		serverAction: props.serverAction,
		state: props.state,
	}
}
