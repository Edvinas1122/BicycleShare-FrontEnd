"use client";

type GiveInteraction = {
	message: "give";
	bicycle_id: string;
	duration: string;
}

type ReturnInteraction = {
	message: "return";
	bicycle_id: string;
}

type OpenInteraction = {
	message: "open";
	bicycle_id: string;
}

type Interaction = GiveInteraction | ReturnInteraction | OpenInteraction;

/*
	About unlock sync:
	https://spangled-hall-d99.notion.site/Implementing-unlock-sync-c7802ada30eb4d70ab89346510981a69

	How to use:
	1. import this function
	2. call it with the pusher object and the interaction object
	3. pass in callbacks for the outcome, processing, and abort events
	4. the function returns a cleanup function that unbinds the events

	Example:
		const {pusher} = usePusher();

		const outcome = (data: any) => {
			console.log("outcome", data);
		}

		const processing = (data: any) => {
			console.log("processing", data);
		}

		const abort = (data: any) => {
			console.log("abort", data);
		}

		const setEventDriver = () => {
			if (!pusher) return;
			const interaction: GiveInteraction = {
				message: "give",
				bicycle_id: bicycle_id,
				duration: duration,
			}
			const cleanup = lockerInteractSequence(
				pusher,
				interaction,
				outcome,
				processing,
				abort,
			);
			return cleanup;
		}

		React.useEffect(setEventDriver, [pusher]);
*/
const lockerInteractSequence = (
	pusher: any,
	interaction: Interaction,
	outcomeCallback: (data: any) => void,
	processingCallback: (data: any) => void,
	abortCallback: (data: any) => void,
	) => {

	// https://github.com/pusher/pusher-js#accessing-channels
	const presenceChannel = pusher.channel("presence-locker-device");

	/*
		Has Unlock approval waiting time exploit. See:
		https://spangled-hall-d99.notion.site/Implementing-unlock-sync-c7802ada30eb4d70ab89346510981a69

		Suggested solution:
		user id marked event (client-open-seq-begin) -> (client-open-seq-end-${user_id})
	*/
	presenceChannel.bind('client-open-seq-begin',
		function(data: any) {
			if (data === "begin") {
				presenceChannel.bind('client-locker-button-press', function(data: any) {
					processingCallback(data);
					presenceChannel.bind('lend-status', function(data: any) {
						outcomeCallback(data);
					});
				});
			} else {
				abortCallback(data);
			}
		}
	);

	// https://github.com/pusher/pusher-js#triggering-client-events
	/*
		Has spamming exploit. See:
		https://spangled-hall-d99.notion.site/Implementing-unlock-sync-c7802ada30eb4d70ab89346510981a69

		Suggested solution:
		use a server-side endpoint to trigger the event
	*/ 
	presenceChannel.trigger('client-open-locker', interaction);

	return () => {
		presenceChannel.unbind('client-locker');
		presenceChannel.unbind('client-locker-button-press');
		presenceChannel.unbind('client-open-seq-begin');
		presenceChannel.unbind('client-open-seq-end');
	}
}

export default lockerInteractSequence;
export type { Interaction, GiveInteraction, ReturnInteraction, OpenInteraction };