
const hostConfig = {
	hostName: process.env.NEXT_PUBLIC_HOSTNAME
}

export const getHostConfig = () => {
	return hostConfig;
}