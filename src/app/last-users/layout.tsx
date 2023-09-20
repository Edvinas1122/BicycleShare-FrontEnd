import DisplayModal from "../components/modal";


export default function Layout({
	children,
}:{
	children: React.ReactNode;
}){
	return (
		<>
			<DisplayModal>
				{children}
			</DisplayModal>
		</>
	);
}