"use client";
import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Select, SelectItem
} from "@nextui-org/react";

export function AdminController({
	terms,
	methods,
}: {
	terms: {
		admin_controller: string,
	},
	methods: {
		[key: string]: (data: any) => void;
	}
}) {
	const [selected, setSelected] = React.useState<string>("0");

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelected(e.target.value);
	};

	const updateCache = () => {
		methods.updateCache({});
	};

	const openLocker = () => {
		methods.open_locker_admin(selected);
	};

	return (
		<>
			<ModalHeader>
				<h2>
					{terms.admin_controller}
				</h2>
			</ModalHeader>
			<ModalBody className={"p-4 m-4 flex flex-row gap-2"}>
				<section>
					<h3>Update Cache</h3>
					<Button 
						onClick={updateCache}
					>
						Update Cache
					</Button>
				</section>
				<section className={
					`w-[100%] justify-center flex flex-col align-center`
				}>
					<h3>Open Locker</h3>
					<div className={`flex gap-2 flex-col`}>
					<Select
						onChange={handleSelectionChange}
						label="Select a locker"
						placeholder="Select an animal"
						defaultSelectedKeys={["cat"]}
						className="max-w-xs"
						scrollShadowProps={{
							isEnabled: false
						}}
						>
						{Array.from({ length: 10 }).map((_, index) => (
							<SelectItem key={index} value={index + 1}>
							{"locker " + (index + 1)}
							</SelectItem>
						))}
					</Select>
					<Button
						onClick={openLocker}
						// className={`h-[100%]`}
						>
						Open
					</Button>
					</div>
				</section>
			</ModalBody>
		</>	
	);

}