"use client";

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
	user_id: string,  // only receive | not an exploit
	locker_id: string,
	processStartedCallback: () => void,
	serverActionCallback: (data: any) => void,
	abortCallback: (data: any) => void,
	) => {

	const open_sequence_event = `client-open-seq-${user_id}`;
	const button_press_event = `client-button-signature-${user_id}`;

	/*
		Implamented approval waiting time exploit resolution. See:
		https://spangled-hall-d99.notion.site/Implementing-unlock-sync-c7802ada30eb4d70ab89346510981a69
	*/
	channel.bind(open_sequence_event,
		function(data: any) {
			if (data === "begin") {
				processStartedCallback();
				channel.bind(button_press_event, function(data: any) {
					serverActionCallback(data);
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
	channel.trigger('client-open-locker', {
		locker_id: locker_id
	});

	return () => {
		/*
			mircrocontroller handles abort
			by identitying the user_id
		*/
		channel.trigger(`client-sequence-abort`, {});
		channel.unbind(button_press_event);
		channel.unbind(open_sequence_event);
	}
}

export default lockerInteractSequence;