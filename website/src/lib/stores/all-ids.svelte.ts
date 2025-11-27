import { readable } from 'svelte/store';

let inFlight: Promise<string[]> | null = null; // re-used while the
let cache: string[] | null = null; // tab is open

export const allIds = readable<string[]>([], (set) => {
	// already have the data → synchronously give it to subscribers
	if (cache) {
		set(cache);
		return;
	}

	// kick off (or re-use) the fetch exactly once
	if (!inFlight) {
		inFlight = fetch('/api/all-ids')
			.then((r) => r.json())
			.then((ids) => (cache = ids)) // remember for the next subscriber
			.catch((e) => {
				console.error('all-ids', e);
				return [];
			});
	}

	inFlight.then(set);
});
