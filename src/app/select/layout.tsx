import DisplayModal, {InterfaceUnit} from "../components/modal";
import
	{dictionaries}
from "@/conf/dictionary.conf";

export default function Layout({
	children,
}:{
	children: React.ReactNode;
}){

	async function startLockerOpenSequence(phrasedRequest: string) {
		"use server";
		console.log(phrasedRequest);
	}

	const modalInterface: InterfaceUnit[] = [
		buttonBuild(
			dictionaries.en.cancel,
			"/", {
				buttonProps: {
					color: "danger",
					variant: "light",
				},
			}),
		buttonBuild(
			dictionaries.en.back,
			"../", { levelAppearant: 2, buttonProps: {
				color: "primary",
				variant: "ghost",
			}}),
		buttonBuild(
			dictionaries.en.info,
			"/info", { levelAppearant: 1, buttonProps: {
				color: "primary",
				variant: "ghost",
			}}),
		buttonBuild(
			dictionaries.en.proceed,
			"/duration", { levelAppearant: 1}),
		buttonBuild(
			dictionaries.en.select,
			"/short", { 
				levelAppearant: 2,
				segmentDemandant: "duration",
				state: "time",
			}),
		buttonBuild(
			dictionaries.en.affirmation,
			"", { 
				levelAppearant: 3,
				serverAction: startLockerOpenSequence
			}),
	];


	return (
		<>
			<DisplayModal
				interfaceItems={modalInterface}
			>
				{children}
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
	const persistent = props.levelAppearant ? false : true;
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
