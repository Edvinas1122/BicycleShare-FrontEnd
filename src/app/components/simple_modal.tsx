"use client";
import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure
} from "@nextui-org/react";
import {useRouter} from "next/navigation";


export default function DisplayModal({
	children,
}: {
	children: React.ReactNode;
}) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const router = useRouter();

	React.useEffect(() => {
		onOpen();
	}, [onOpen]);

	const Close = () => {
		onOpenChange();
		setTimeout(() => {
			router.replace("/");
		}, 200);
	};

	return (
		<>
		<Modal isOpen={isOpen} onOpenChange={Close}>
			<ModalContent>
			{(onClose) => (
				<>
				{children}
				</>
			)}
			</ModalContent>
		</Modal>
		</>
	);
}