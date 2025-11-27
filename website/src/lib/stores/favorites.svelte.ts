// import { BROWSER } from 'esm-env';

// let favoritesState = $state({
// 	ids: new Set<string>()
// });

// if (BROWSER) {
// 	const stored = localStorage.getItem('favorite_proverbs');
// 	if (stored) {
// 		try {
// 			favoritesState.ids = new Set(JSON.parse(stored));
// 		} catch (e) {
// 			console.error('Failed to parse favorites from localStorage', e);
// 		}
// 	}
// }

// function save() {
// 	if (BROWSER) {
// 		localStorage.setItem('favorite_proverbs', JSON.stringify(Array.from(favoritesState.ids)));
// 	}
// }

// // --- START OF CHANGES ---

// function add(id: string) {
// 	// Create a new Set from the existing one and add the new ID.
// 	// Then, ASSIGN this new Set back to the state.
// 	favoritesState.ids = new Set([...favoritesState.ids, id.toUpperCase()]);
// 	save();
// }

// function remove(id: string) {
// 	// Create a new Set from the existing one.
// 	const newIds = new Set(favoritesState.ids);
// 	// Mutate the *new* Set.
// 	newIds.delete(id.toUpperCase());
// 	// ASSIGN the new Set back to the state.
// 	favoritesState.ids = newIds;
// 	save();
// }

// // --- END OF CHANGES ---

// function has(id: string) {
// 	return favoritesState.ids.has(id.toUpperCase());
// }

// function toggle(id: string) {
// 	if (has(id)) {
// 		remove(id);
// 	} else {
// 		add(id);
// 	}
// }

// export const favorites = {
// 	state: favoritesState,
// 	add,
// 	remove,
// 	has,
// 	toggle
// };
import { BROWSER } from 'esm-env';
import type { ProverbSummary } from '$lib/types';

// The state now holds an array of summary objects
let favoritesState = $state<{ proverbs: ProverbSummary[] }>({
	proverbs: []
});

if (BROWSER) {
	const stored = localStorage.getItem('favorite_proverbs');
	if (stored) {
		try {
			// Parse the stored array of objects
			favoritesState.proverbs = JSON.parse(stored);
		} catch (e) {
			console.error('Failed to parse favorites from localStorage', e);
		}
	}
}

function save() {
	if (BROWSER) {
		localStorage.setItem('favorite_proverbs', JSON.stringify(favoritesState.proverbs));
	}
}

// `add` now takes a full ProverbSummary object
function add(proverb: ProverbSummary) {
	if (has(proverb.proverb_id)) return; // Don't add duplicates
	favoritesState.proverbs = [...favoritesState.proverbs, proverb];
	save();
}

// `remove` finds the proverb by ID and filters it out
function remove(id: string) {
	favoritesState.proverbs = favoritesState.proverbs.filter(
		(p) => p.proverb_id !== id.toUpperCase()
	);
	save();
}

// `has` checks if a proverb with a given ID is in the array
function has(id: string): boolean {
	return favoritesState.proverbs.some((p) => p.proverb_id === id.toUpperCase());
}

// `toggle` now needs both the ID and the text to add a favorite
function toggle(proverb: ProverbSummary) {
	if (has(proverb.proverb_id)) {
		remove(proverb.proverb_id);
	} else {
		// Ensure the ID is uppercase for consistency when adding
		add({ ...proverb, proverb_id: proverb.proverb_id.toUpperCase() });
	}
}

export const favorites = {
	get state() {
		return favoritesState;
	}, // Use a getter to expose the state
	add,
	remove,
	has,
	toggle
};
