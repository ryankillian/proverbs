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

	const isFavorite = $derived(favorites.has(proverb_id));

	function handleToggleFavorite() {
		favorites.toggle({ proverb_id, proverb_text });
	}
</script>

<!-- The outer element is a button for accessibility and correct semantics -->
<button
	type="button"
	onclick={handleToggleFavorite}
	aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
	class="w-full cursor-pointer rounded-lg border border-transparent p-0 text-left text-lg font-semibold text-slate-900 transition hover:bg-slate-50"
>
	<div class="flex items-center justify-between p-3">
		<span class="text-xl font-semibold hover:text-slate-600">Save to Favorites</span>

		{#if isFavorite}
			<StarSolid class="h-5 w-5 text-yellow-500" />
		{:else}
			<StarOutline class="h-5 w-5 text-slate-400" />
		{/if}
	</div>
</button>
