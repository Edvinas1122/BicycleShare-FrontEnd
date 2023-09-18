import DisplayModal, {InterfaceUnit} from "../components/modal";
import
	{dictionaries}
from "@/conf/dictionary.conf";

export default function Layout({
	children,
}:{
	children: React.ReactNode;
}){

	async function startLockerOpenSequence() {
		"use server";
		console.log("startLockerOpenSequence");
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
			dictionaries.en.info,
			"/info", { levelAppearant: 1, buttonProps: {
				color: "primary",
				variant: "ghost",
			}}),
		buttonBuild(
			dictionaries.en.proceed,
			"/duration", { levelAppearant: 1,}),
		buttonBuild(
			dictionaries.en.select,
			"/short", { 
				levelAppearant: 2,
				segmentDemandant: "duration",
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
	}
) {
	const persistent = props.levelAppearant ? false : true;
	const close = route === "/" ? true : false;
	const buttonProps = props.buttonProps ? props.buttonProps : {
		color: "primary"
	};
	return {
		buttonChildren: children,
		route: route,
		close: close,
		persistent: persistent,
		levelAppearant: props.levelAppearant,
		segmentDemandant: props.segmentDemandant,
		buttonProps: buttonProps,
		serverAction: props.serverAction,
	}
}
