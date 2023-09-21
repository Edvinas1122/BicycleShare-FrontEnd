"use client";
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell
} from "@nextui-org/react";
import React, {use, Suspense} from "react";

type Timestamp = {
	taken: string,
	returned: string,
	user: string,
};



export default function PromiseTable({
	timestamps,
}: {
	timestamps: Promise<any>,
}){
	
	return (
		<>
		<Suspense fallback={<TableSkeleton/>}>
			<TableFrame
				timeStamps={timestamps}
				>
				{/* <UserTable timestamps={timestamps}/> */}
			</TableFrame>
		</Suspense>
		</>
	);
}

function TableFrame({
	children,
	timeStamps,
}: {
	children: React.ReactNode,
	timeStamps: Promise<any>,
}) {

	const data = use(timeStamps) || [];
	const columns = data.map((item: any) => {
		console.log(item);
		const data = JSON.parse(item.value);
		return data;
	})
	console.log(columns);

	return (
		<>
		<Table removeWrapper aria-label="Example static collection table">
			<TableHeader>
				<TableColumn>Who</TableColumn>
				<TableColumn>took</TableColumn>
				<TableColumn>returned</TableColumn>
			</TableHeader>
			<TableBody>
			{columns.map((item: any, index: number) => {
				if (!item) return null;
				return (
					<TableRow key={index}>
						<TableCell>{item.name}</TableCell>
						<TableCell>{item.start}</TableCell>
						<TableCell>{item.end}</TableCell>
					</TableRow>
				);
			})}
			</TableBody>
		</Table>
		</>
	);
}
function TableSkeleton({
}: {
}) {
	return (
		<>
		<Table removeWrapper aria-label="Example static collection table">
			<TableHeader>
				<TableColumn>Who</TableColumn>
				<TableColumn>took</TableColumn>
				<TableColumn>returned</TableColumn>
			</TableHeader>
			<TableBody>
			{/* {children} */}
			</TableBody>
		</Table>
		</>
	);
}