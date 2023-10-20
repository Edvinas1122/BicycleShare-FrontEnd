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
*/
const lockerInteractSequence = (
	channel: any,
	interaction: Interaction,
	user_id: string,
	outcomeCallback: (data: any) => void,
	processStartedCallback: () => void,
	processingCallback: (data: any) => void,
	abortCallback: (data: any) => void,
	) => {

	/*
		Implamented approval waiting time exploit resolution. See:
		https://spangled-hall-d99.notion.site/Implementing-unlock-sync-c7802ada30eb4d70ab89346510981a69
	*/
	console.log("binding to client-open-seq-" + user_id + "...");
	channel.bind(`client-open-seq-${user_id}`,
		function(data: any) {
			if (data === "begin") {
				processStartedCallback();
				channel.bind('client-locker-button-press', function(data: any) {
					processingCallback(data);
					channel.bind('lend-status', function(data: any) {
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
	channel.trigger('client-open-locker', interaction);

	return () => {
		/*
			mircrocontroller handles abort
			by identitying the user_id
		*/
		channel.trigger(`client-sequence-abort`, {});
		channel.unbind('client-locker');
		channel.unbind('client-locker-button-press');
		channel.unbind('client-open-seq-begin');
		channel.unbind('client-open-seq-end');
	}
}

export default lockerInteractSequence;
export type { Interaction, GiveInteraction, ReturnInteraction, OpenInteraction };