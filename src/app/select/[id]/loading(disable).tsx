import
	{dictionaries}
from "@/conf/dictionary.conf";
import 
	LoadingSkeleton
from "../loadingSkeleton"

export default function Loading() {

	return (
		<div>
			<LoadingSkeleton>
			<h1 className="text-xl font-bold">
				{dictionaries.en.loading}
			</h1>
			</LoadingSkeleton>
		</div>
	);
}