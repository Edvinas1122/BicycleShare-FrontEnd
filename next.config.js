/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
	webpack: (config) => {
        // config.resolve.alias['@edvinas1122'] = path.resolve(__dirname, './local_modules/@edvinas1122');
        // config.resolve.modules = [
        //     ...config.resolve.modules, // Keep the existing modules resolution
        //     path.resolve(__dirname, './local_modules/@edvinas1122', 'src')
        // ];

		config.module.rules.push({
			test: /cv\/page\.tsx$/,
			use: [
				{
					loader: 'null-loader',
				},
			],
		});
		config.module.rules.push({
			test: /next-cv\/.*\.(tsx|ts|js)$/,
			use: [
				{
					loader: 'null-loader',
				},
			],
		});
		config.resolve.alias['@'] = path.resolve(__dirname, './src');
		return config;
	},
	// experimental: {
	// 	serverActions: true,
	// },
	headers: async () => [
		{
			source: '/:all*(svg)',
			locale: false,
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=60, stale-while-revalidate',
				},
			],
		}
	],
	images: {
		unoptimized: true,
		minimumCacheTTL: 6000,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
				port: '',
				pathname: '**',
			}
		]
	},
	// compiler: {
	// 	removeConsole: {
		// 	exclude: ['error'],
	// 	},
	// },
}

module.exports = nextConfig
