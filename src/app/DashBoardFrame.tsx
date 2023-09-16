import BicycleListWrapper from "./components/BicycleWrapper";

const DashBoardFrame = ({
	children
}: {
	children: React.ReactNode
}) => {

	const dashBoardFrameStyle = "w-full h-full items-center justify-center";

	return (
		<div className={dashBoardFrameStyle}>
			<BicycleListWrapper>
			{children}
			</BicycleListWrapper>
		</div>
	);
}

export default DashBoardFrame;