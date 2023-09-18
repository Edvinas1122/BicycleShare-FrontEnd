import { 
	ModalContentWrapper
} from "@/app/components/modal";

interface LayoutProps {
	children: React.ReactNode;
	header: React.ReactNode;
	device: React.ReactNode;
}

export default function Layout({
	children,
	device,
	header,
}: LayoutProps) {
	return (
		<>
			<ModalContentWrapper
				headerContent={header}
			>
			<>
			{device}
			{children}
			</>
			</ModalContentWrapper>
		</>
	);
}