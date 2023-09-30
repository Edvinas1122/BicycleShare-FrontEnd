"use client";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useRouter, usePathname, useSelectedLayoutSegments, useSearchParams} from "next/navigation";

export type InterfaceUnit = {
	buttonChildren: React.ReactNode;
	route: string;
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
}: {
	interfaceItems?: InterfaceUnit[];
}) {
	if (!interfaceItems) return null;
	const pathname = usePathname();
	const router = useRouter();
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

function CloseButton({
	onClose,
	label,
}: {
	onClose: Function
	label: string;
}) {
	return (
		<Button
			onClick={() => onClose()}
			color="danger"
			variant="light"
		>
			{label}
		</Button>
	)
}

export default function DisplayModal({
	children,
	modalInterface,
	closeButton,
}: {
	children: React.ReactNode;
	modalInterface: React.ReactNode;
	closeButton: {route: string, label: string};
}) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const router = useRouter();

	React.useEffect(() => {
		onOpen();
	}, []);

	const Close = () => {
		onOpenChange();
		setTimeout( () => {router.replace(closeButton.route);}, 200);
	};

	return (
		<>
		<Modal isOpen={isOpen} onOpenChange={Close}>
				<ModalContent>
				{(onClose) => (
					<>
					{children}
					<ModalFooter>
						<CloseButton
							onClose={Close}
							label={closeButton.label}

						/>
						{modalInterface}
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

