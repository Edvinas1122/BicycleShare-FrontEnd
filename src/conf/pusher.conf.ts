
const pusherConfig = {
	appId: process.env.PUSHER_APP_ID as string,
	key: process.env.PUSHER_KEY as string,
	secret: process.env.PUSHER_SECRET as string,
	cluster: 'eu',
	useTLS: true,
};

export const getPusherConfig = () : {
	appId: string,
	key: string,
	secret: string,
	cluster: string,
	useTLS: boolean
} => {
	if (!pusherConfig.appId) throw new Error("PUSHER_APP_ID is not defined");
	if (!pusherConfig.key) throw new Error("PUSHER_KEY is not defined");
	if (!pusherConfig.secret) throw new Error("PUSHER_SECRET is not defined");
	if (!pusherConfig.cluster) throw new Error("PUSHER_CLUSTER is not defined");
	if (!pusherConfig.useTLS) throw new Error("PUSHER_USE_TLS is not defined");
	return pusherConfig;
}