"use client";
import
{
	Card,
	CardHeader,
	CardBody,
	CardFooter,

} from "@nextui-org/react";

import
	AcceptButton
from "./Button";


interface ViewCardProps {
	headerContent?: React.ReactNode;
	bodyContent?: React.ReactNode;
	footerContent?: React.ReactNode;
}
  
const ViewCard: React.FC<ViewCardProps> = ({
	headerContent,
	bodyContent,
	footerContent,
}) => {
	return (
		<Card className="w-[400px] mx-auto loading max-h-[800px] h-[80vh]">
			<CardHeader>
				{headerContent}
			</CardHeader>
			<CardBody className="terms h-[90%]">
				{bodyContent}
			</CardBody>
			<CardFooter className="h-[100px] flex flex-col justify-center">
				<AcceptButton
					handleLogin={() => {}}
					buttonText={"Accept"}
				/>
			</CardFooter>
		</Card>
	);
};

export default ViewCard;