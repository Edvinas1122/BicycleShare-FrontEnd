import {
	notFound
} from 'next/navigation'
import
	constructBicycleService
from "@/components/bicycle-api/bicycle.module";
import
	BicycleProfile, {BicycleProfileInfo}
from "./profile";

export default function Page({
	params 
}: { 
	params: { id: string } 
}) {
	const service = constructBicycleService({cache: 'no-store'});
	const bicycle = service.getBicycleInterface(Number(params.id));
	const bicycleInfo: Promise<BicycleProfileInfo> = bicycle.then((bicycle) => {
		if (!bicycle) {
			// notFound();
			throw new Error('Bicycle not found');
		}
		return {
			name: bicycle.data.Name.title[0].plain_text,
			image: bicycle.getImageLink(),
		};
	}).catch(error => ({
		name: "error",
		image: Promise.resolve("/default.png"),
	}));

	return (
		<div>
			<div className={
				"flex flex-row h-[50px] items-center"
			}>
				<BicycleProfile info={bicycleInfo}/>
			</div>
		</div>
	);
}