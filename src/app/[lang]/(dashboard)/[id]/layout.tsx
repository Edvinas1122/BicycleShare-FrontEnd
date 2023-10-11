import DisplayModal, {InterfaceUnit} from "@/app/components/modal";
import {
	dictionaries,
	Language
} from "@/conf/dictionary.conf";
import { 
	ModalContentWrapper
} from "@/app/components/modal";
import { DeviceControllerContextProvider } from "./context";

export default async function Layout({
	children,
	header,
	modalInterface,
	params: {lang}
}:{
	children: React.ReactNode;
	header: React.ReactNode;
	modalInterface: React.ReactNode;
	params: {lang: Language};
}){

	return (
		<>
			<DeviceControllerContextProvider>
			<DisplayModal
				modalInterface={modalInterface}
				closeButton={{
					route: "/" + lang,
					label: dictionaries[lang].cancel,
				}}
				>
			<ModalContentWrapper
				headerContent={header}
				>
			<>
			{children}
			</>
			</ModalContentWrapper>
			</DisplayModal>
			</DeviceControllerContextProvider>
		</>
	);
}


// /*
// 	@description
// 	@params
// 	@children - the text to display on the button
// 	@route - the route to navigate to next 
// 		- (if "/" then close the modal)
// 		- if serverAction is not defined
// 	@props - the props to pass to the button
// 	@props.levelAppearant - the level of route to appear
// 	@props.buttonProps - the props to pass to the button
// 	@props.serverAction - the action to perform on the server
// */
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
