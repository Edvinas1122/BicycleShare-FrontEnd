import
	{dictionaries}
from "@/conf/dictionary.conf";

export default function Page() {
	return (
		<div>
			<h1 className="text-xl font-bold"> 
				{dictionaries.en.reserve}
			</h1>
			<p>
				{dictionaries.en.reserve_process_reassurance}
			</p>
		</div>
	);
}