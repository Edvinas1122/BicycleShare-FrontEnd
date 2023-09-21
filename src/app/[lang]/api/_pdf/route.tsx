// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';
// import CV from '@/components/next-cv/CV';

// /*
// 	requires puppeteer to be installed
// 	and chrome to be installed on the server

// 	apt-get install chromium
// 	npm i puppeteer
// */

// const generatePDF = async (htmlContent) => {
// 	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
// 	const page = await browser.newPage();
// 	await page.setContent(htmlContent);
// 	const pdf = await page.pdf({ format: 'A4' });
// 	await browser.close();
// 	return pdf; // You can save or send this PDF as needed
// };

// export async function GET(request: Request) {
// 	const ReactDOMServer = (await import('react-dom/server')).default;
// 	const cvHtmlString = ReactDOMServer.renderToString(
// 		<CV data={data} /> // assuming data is defined somewhere
// 	);

// 	const html = `
// 		<!DOCTYPE html>
// 		<html lang="en">
// 		<head>
// 		</head>
// 		<body>
// 			${cvHtmlString}
// 		</body>
// 		</html>`;
		
// 	// const file = await generatePDF(html);
// 	// return new Response(file, {
// 	// 	headers: {
// 	// 		'Content-Type': 'application/pdf',
// 	// 		'Content-Disposition': 'attachment; filename="file.pdf"',
// 	// 	},
// 	// });
// 	console.log(html);

// 	return new Response(html, {
// 		headers: {
// 			'content-type': 'text/html; charset=utf-8',
// 		},
// 	});
// }