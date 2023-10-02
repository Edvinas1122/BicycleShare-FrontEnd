import DashBoardFrame from "./DashBoardFrame"


export default function Layout({
	children,
	bicycles,
	navbar
}: {
	children: React.ReactNode,
	bicycles: React.ReactNode,
	navbar: React.ReactNode,
}) {

	const className = `
		flex flex-col w-[100vw] h-[100vh] items-center justify-center`;
	const dashBoardFrameStyle = "w-full h-full items-center justify-start h-[100vh] w-[100vw] flex flex-col gap-4";

	return (
		<div className={className}>
			{navbar}
			<div className={dashBoardFrameStyle}>
			<DashBoardFrame>
				{children}
				{bicycles}
			</DashBoardFrame>
			</div>
		</div>
	);
}
