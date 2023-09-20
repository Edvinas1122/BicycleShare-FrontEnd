interface ChildDatabase {
	title: string;

}

export default function handleChildDatabase(block: any): any {
	const childDatabase: ChildDatabase = block.child_database;

	return (
		<div>
			Child Database
			{childDatabase.title}
		</div>
	);

}
