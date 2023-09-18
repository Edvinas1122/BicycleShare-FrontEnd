import
	{dictionaries}
from "@/conf/dictionary.conf";

export default function Page() {
	return (
		<div>
			<h1 className="text-xl font-bold"> 
				{dictionaries.en.info}
			</h1>
			<ol className="list-decimal list-inside">
				{dictionaries.en.info_description.map((item, index) => {
					return (
						<li key={index}>
							{item}
						</li>
					);
				})}
			</ol>
		</div>
	);
}