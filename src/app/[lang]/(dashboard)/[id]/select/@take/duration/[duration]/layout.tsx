// export async function generateStaticParams() {
// 	return [{ duration: 'short' }, { duration: 'hours' }, { duration: 'long' }, { duration: 'night' }]
// }

// export const dynamicParams = false;

export default function Layout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<>
		{children}
		</>
	);
}