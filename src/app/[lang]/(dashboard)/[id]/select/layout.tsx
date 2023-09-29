export default function Layout({
	children,
	device,
}:{
	children: React.ReactNode;
	device: React.ReactNode;
}){	

	return (
		<>
			{device}
			{children}
		</>
	);
}