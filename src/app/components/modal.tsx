"use client";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
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
}, []);

const Close = () => {
	onOpenChange();
	setTimeout( () => {router.push("/");}, 200);
};

return (
	<>
	<Modal isOpen={isOpen} onOpenChange={Close}>
		<ModalContent>
		{(onClose) => (
			<>
			<ModalHeader className="flex flex-col gap-1">Reservation</ModalHeader>
			<ModalBody>
				{children}
			</ModalBody>
			<ModalFooter>
				<Button color="danger" variant="light" onPress={onClose}>
					Cancel
				</Button>
				<Button color="primary" onPress={onClose}>
					Proceed
				</Button>
			</ModalFooter>
			</>
		)}
		</ModalContent>
	</Modal>
	</>
);
}

