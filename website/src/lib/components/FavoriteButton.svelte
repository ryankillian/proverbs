<script lang="ts">
	import StarOutline from '$lib/components/icons/StarOutline.svelte';
	import StarSolid from '$lib/components/icons/StarSolid.svelte';
	import { favorites } from '$lib/stores/favorites.svelte';

	let {
		proverb_id,
		proverb_text
	}: {
		proverb_id: string;
		proverb_text: string;
	} = $props();

	// The logic is identical, just moved from the page to the component
	const isFavorite = $derived(favorites.has(proverb_id));

	function handleToggleFavorite() {
		favorites.toggle({ proverb_id, proverb_text });
	}
</script>

<button
	type="button"
	aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
	onclick={handleToggleFavorite}
	class="flex items-center gap-3 rounded-full px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-200 lg:rounded-lg"
>
	{#if isFavorite}
		<StarSolid class="h-5 w-5 text-yellow-500" />
		<span>Saved to Favorites</span>
	{:else}
		<StarOutline class="h-5 w-5 text-slate-400" />
		<span>Save to Favorites</span>
	{/if}
</button>
