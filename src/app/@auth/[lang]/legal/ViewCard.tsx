"use client";
import React, { Suspense } from "react";
import
{
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	ScrollShadow,
	Skeleton
} from "@nextui-org/react";

import
	AcceptButton
from "./Button";

import
	NotionPageData
from "@/components/notion-views/NotionPage";
import
	SkeletonLoad
from "./Skeleton";

import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/components/authContext";

interface ViewCardProps {
	headerContent?: React.ReactNode;
	bodyContent?: Promise<any>;
	action: () => void;
}
  
const ViewCard: React.FC<ViewCardProps> = ({
	headerContent,
	bodyContent,
	action,
}) => {

	const { auth, authorized, termsAccepted } = React.useContext(AuthContext);
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	
	const handleLoginBrach = async () => {
		setLoading(true);
		const response = await action();
		auth.closeAuthorization(true);
		router.replace("/");
	};
	
	if (termsAccepted) {
		return null;
	}

	return (
		<Card className="w-[400px] mx-auto loading max-h-[800px] h-[80vh]">
			<CardHeader>
				{headerContent}
			</CardHeader>
			{bodyContent && <CardBody className="terms h-[90%]">
				<ScrollShadow hideScrollBar isEnabled={true}>
					<Suspense fallback={<SkeletonLoad/>}>
						<NotionPageData
							data={bodyContent}
						/>
					</Suspense>
				</ScrollShadow>
			</CardBody>}
			<CardFooter className="h-[100px] flex flex-col justify-center">
				<AcceptButton
					handleLogin={handleLoginBrach}
					buttonText={"Accept"}
					loading={loading}
				/>
			</CardFooter>
		</Card>
	);
};

export function ViewCardSceleton() {
	const lineCount = 10;
	return (
		<Card className="w-[400px] mx-auto loading max-h-[800px] h-[80vh]">
			<CardHeader>
				<Skeleton className="h-8 w-1/2 rounded-lg ml-2" />
			</CardHeader>
			<CardBody className="terms h-[90%]">
				{Array.from({ length: lineCount }).map((_, index) => (
					<Skeleton
						key={index}
						className={`h-3 w-${(index % 2) === 0 ? "3/5" : "4/5"} rounded-lg
						${(index % 2) === 0 ? "ml-2" : "ml-4"} my-2
						`}
					/>
				))}
			</CardBody>
			<CardFooter className="h-[100px] flex flex-col justify-center">
			</CardFooter>
		</Card>
	);
}

export default ViewCard;