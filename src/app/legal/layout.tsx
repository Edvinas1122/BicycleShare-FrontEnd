import
	LockedDisplay
from "@/components/reactiveDisplay/lockedComponent";
import
	ViewCard
from "./ViewCard";

export default function TermsAndConditionsLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			{/* <LockedDisplay> */}
				<ViewCard
					headerContent={
						<h1>Terms & Conditions</h1>
					}
					bodyContent={children}
				/>
			{/* </LockedDisplay> */}
		</>
	);
}