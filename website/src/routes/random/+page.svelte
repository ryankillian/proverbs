<script lang="ts">
	import { allIds } from '$lib/stores/all-ids.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(() => {
		const already = get(allIds);

		if (already.length) {
			goto(`/proverbs/${pick(already)}`);
		} else {
			const stop = allIds.subscribe((ids) => {
				if (ids.length) {
					stop(); // clean up
					goto(`/proverbs/${pick(ids)}`);
				}
			});
		}
	});

	function pick(ids: string[]) {
		return ids[(Math.random() * ids.length) | 0];
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
