"use client";
import React, {createContext, useState, useContext} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {useRouter, usePathname, useSelectedLayoutSegments} from "next/navigation";

export type InterfaceUnit = {
	buttonChildren: React.ReactNode;
	route: string;
	close: boolean;
	persistent?: boolean;
	levelAppearant?: number;
	segmentDemandant?: string;
	buttonProps: {
		[key: string]: any;
	};
	serverAction?: Function;
}

// function countDepth(): number {
// 	const segments = useSelectedLayoutSegments();
// 	return segments.length;
// }

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
	const {sharedState} = useModalContext();
	const pathname = usePathname();
	const segments = useSelectedLayoutSegments();
	const depth = segments.length;

	return (
		<>
		{interfaceItems.map((unit: InterfaceUnit, index: number) => {
			const display = unit.levelAppearant ? unit.levelAppearant === depth : true;
			if (!display) return null;
			if (unit.segmentDemandant && unit.segmentDemandant !== segments[depth - 1]) return null;
			return (
				<Button
					key={index}
					onClick={() => {
						if (unit.serverAction) unit.serverAction();
						else if (unit.close) onClose();
						else {
							const route = sharedState ? ("/" + sharedState) : unit.route;
							router.push(pathname + route);

						};
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

const ModalContext = createContext<{
	sharedState: any;
	setSharedState: React.Dispatch<React.SetStateAction<any>>;
}>({
	sharedState: null,
	setSharedState: () => {},
});
  
export const useModalContext = () => {
	return useContext(ModalContext);
};
  

export default function DisplayModal({
	children,
	interfaceItems,
}: {
	children: React.ReactNode;
	interfaceItems?: InterfaceUnit[];
}) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const [sharedState, setSharedState] = useState(null);
	const router = useRouter();

	React.useEffect(() => {
		onOpen();
	}, []);

	const Close = () => {
		onOpenChange();
		setTimeout( () => {router.push("/");}, 200);
	};

	return (
		<>
		<Modal isOpen={isOpen} onOpenChange={Close}>
			<ModalContext.Provider value={{ sharedState, setSharedState }}>
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
			</ModalContext.Provider>
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

