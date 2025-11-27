// import { writable } from 'svelte/store';
// import { browser } from '$app/environment';

// const defaultSectionState = {
// 	transcription: true, // Default to open
// 	similar: true, // Default to open
// 	analysis: true // Default to open
// };

// const initialValue = browser
// 	? JSON.parse(window.localStorage.getItem('sectionState') || JSON.stringify(defaultSectionState))
// 	: defaultSectionState;

// export const sectionState = writable(initialValue);

// if (browser) {
// 	sectionState.subscribe((value) => {
// 		window.localStorage.setItem('sectionState', JSON.stringify(value));
// 	});
// }

// import { writable } from 'svelte/store';
// import { browser } from '$app/environment';

// const defaultState = {
// 	transcription: true,
// 	similar: true,
// 	analysis: true
// };

// const createPersistentStore = () => {
// 	if (!browser) {
// 		return writable(defaultState);
// 	}

// 	const stored = localStorage.getItem('sectionState');
// 	const data = stored ? JSON.parse(stored) : defaultState;
// 	const store = writable(data);

// 	store.subscribe((value) => {
// 		localStorage.setItem('sectionState', JSON.stringify(value));
// 	});

// 	return store;
// };

// export const sectionState = createPersistentStore();

import { browser } from '$app/environment';

const defaultState = {
	transcription: true,
	similar: true,
	analysis: true
};

// 1. Define a class to hold our state and logic
class PersistentSectionState {
	// 2. Define the state properties using `$state`
	sections = $state(defaultState);
	hydrated = $state(false);

	constructor() {
		// 3. The logic now lives inside the constructor's `$effect`
		$effect(() => {
			if (browser) {
				if (!this.hydrated) {
					// Initial sync from localStorage
					const storedValue = localStorage.getItem('sectionState');
					if (storedValue) {
						try {
							this.sections = JSON.parse(storedValue);
						} catch {
							this.sections = defaultState;
						}
					}
					this.hydrated = true;
				} else {
					// Subsequent updates get written back to localStorage
					localStorage.setItem('sectionState', JSON.stringify(this.sections));
				}
			}
		});
	}
}

// 4. Export a single instance of this class
export const sectionsState = new PersistentSectionState();
