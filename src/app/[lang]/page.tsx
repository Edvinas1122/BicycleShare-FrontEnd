/*
	
*/ 
export default function Page({params: {lang}}: {params: {lang: string}}) {
	return (
		<>
			<h1>{lang}</h1>
		</>
	);
}