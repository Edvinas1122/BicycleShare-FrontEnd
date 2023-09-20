import {
	dictionaries
} from "@/conf/dictionary.conf";

// export function generateStaticParams() {
// 	return [{ duration: 'short' }, { duration: 'hours' }, { duration: 'long' }, { duration: 'night' }]
// }

export default function Page({
	params
}: {
	params: { duration: string }
}) {
	return (
		<div>
			<h1 className="text-xl font-bold">
				{dictionaries.en.confirm}
			</h1>
			<p>
				{/* {params.duration} */}
				{dictionaries.en.confirm_description}
			</p>
		</div>
	);
}