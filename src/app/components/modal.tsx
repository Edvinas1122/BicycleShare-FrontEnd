"use client";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useRouter, usePathname, useSelectedLayoutSegments, useSearchParams} from "next/navigation";

export type InterfaceUnit = {
	buttonChildren: React.ReactNode;
	route: string;
	close: boolean;
	back: boolean;
	persistent?: boolean;
	levelAppearant?: number;
	segmentDemandant?: string;
	buttonProps: {
		[key: string]: any;
	};
	serverAction?: Function;
	state?: string;

}

export function ModalInterface ({
	interfaceItems,
	onClose,
	router,
}: {
	interfaceItems?: InterfaceUnit[];
	onClose: Function;
	router: any;
}) {
	if (!interfaceItems) return null;
	const pathname = usePathname();
	const segments = useSelectedLayoutSegments();
	const depth = segments.length;

	const routerAction = (unitroute: string, state?: string) => {
		const urlParams = state ? new URLSearchParams(window.location.search): null;
		const search = state && urlParams ? urlParams.get(state) : null;
		const route = search ? ("/" + search) : unitroute;
		router["push"](pathname + route);
	};
	
	return (
		<>
		{interfaceItems.map((unit: InterfaceUnit, index: number) => {
			const display = unit.persistent || (unit.levelAppearant === depth);
			if (!display) return null;
			if (unit.segmentDemandant && unit.segmentDemandant !== segments[depth - 1]) return null;
			return (
				<Button
				key={index}
				onClick={() => {
					if (unit.serverAction) unit.serverAction(pathname);
					else if (unit.close) onClose();
					else if (unit.back) router.back();
					else {
						console.log("unit.state", unit.state);
						routerAction(unit.route, unit.state);
					}
					}}
					{...unit.buttonProps}
					>
					{unit.buttonChildren}
				</Button>
			)
		})}
		</>
	)
}

export default function DisplayModal({
	children,
	interfaceItems,
	closeRoute,
}: {
	children: React.ReactNode;
	interfaceItems?: InterfaceUnit[];
	closeRoute: string;
}) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const router = useRouter();

	React.useEffect(() => {
		onOpen();
	}, []);

	const Close = () => {
		onOpenChange();
		setTimeout( () => {router.push(closeRoute);}, 200);
	};

	return (
		<>
		<Modal isOpen={isOpen} onOpenChange={Close}>
				<ModalContent>
				{(onClose) => (
					<>
					{children}
					<ModalFooter>
						<ModalInterface
							interfaceItems={interfaceItems}
							onClose={Close}
							router={router}
						/>
					</ModalFooter>
					</>
				)}
				</ModalContent>
		</Modal>
		</>
	);
}

export const ModalContentWrapper = ({
	children,
	headerContent,
}: {
	children: React.ReactNode;
	headerContent: React.ReactNode;
}) => {
	return (
		<>
			<ModalHeader className="flex flex-col gap-1">
				{headerContent}
			</ModalHeader>
			<ModalBody>
				{children}
			</ModalBody>
		</>
	);
}

