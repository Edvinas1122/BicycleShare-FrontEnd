"use client";
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Skeleton,
	Spinner,
	getKeyValue,
	User
} from "@nextui-org/react";
import React, {use, Suspense} from "react";

type Timestamp = {
	taken: string,
	returned: string,
	user: string,
};

export function TableFrame({
	headings,
	getTimestamps,
}: {
	headings: {key: string, label: string}[],
	getTimestamps: (iteration: number) => Promise<any[] | null>,
}) {

	const [timeStamps, setTimeStamps] = React.useState<any[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);
	const updateTimestamps = async () => {
		setLoading(true);
		const stamps = await getTimestamps(0);
		if (stamps) {
			setTimeStamps(stamps);
			setLoading(false);
		}
	};

	React.useEffect(() => {
		updateTimestamps();
	}, [setTimeStamps, setLoading]);

	const classNames={
        base: "max-h-[520px]",
        table: "min-h-[320px]",
    }

	const renderCells = React.useCallback((item: any, columnKey: React.Key) => {
		switch (columnKey) {
			case "name":
				return (<User 
						name={item.name}
						avatarProps={{
							src: item.image,
							size: "sm",
						}}
					/>);
			default:
				return item[columnKey];
		}
	}, [timeStamps]);

	return (
		<>
		<Table removeWrapper classNames={classNames}>
			<TableHeader columns={headings}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody
				isLoading={loading}
				loadingContent={<Spinner />}
				items={timeStamps}
			>
			{(item: any) => (
				<TableRow key={item.startUnix}>
					{(columnKey) => <TableCell>{renderCells(item, columnKey)}</TableCell>}
				</TableRow>
			)}
			</TableBody>
		</Table>
		</>
	);
}
export function TableSkeleton({
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
			<TableBody isLoading={true}>
			{/* {children} */}
			</TableBody>
		</Table>
		</>
	);
}