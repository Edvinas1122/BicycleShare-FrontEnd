/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
	webpack: (config) => {
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
	experimental: {
		serverActions: true,
	},
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
		minimumCacheTTL: 60,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
				port: '',
				pathname: '**',
			}
		]
	}
}

module.exports = nextConfig
