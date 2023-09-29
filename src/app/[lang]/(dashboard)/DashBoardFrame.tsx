import BicycleListWrapper from "./components/BicycleWrapper";

const DashBoardFrame = ({
	children
}: {
	children: React.ReactNode
}) => {

	return (
		<>
			<BicycleListWrapper>
			{children}
			</BicycleListWrapper>
		</>
	);
}

export default DashBoardFrame;