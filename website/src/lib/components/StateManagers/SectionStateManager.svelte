<script lang="ts">
	import { browser } from '$app/environment';
	import { sectionsState } from '$lib/state/sections.svelte';

	// This is the correct and safe place to use `$effect`
	$effect(() => {
		if (browser) {
			// On first run, load from localStorage
			const stored = localStorage.getItem('sectionState');
			if (stored) {
				try {
					// Directly assign to the imported state object
					Object.assign(sectionsState, JSON.parse(stored));
				} catch {
					// handle potential corrupt data
				}
			}

			// This nested effect will now correctly track changes
			// to the `sectionsState` object and persist them.
			$effect(() => {
				localStorage.setItem('sectionState', JSON.stringify(sectionsState));
			});
		}
	});
</script>

<!-- This component renders nothing. Its only job is to run the effect. -->
