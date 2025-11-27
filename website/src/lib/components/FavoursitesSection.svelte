<script lang="ts">
	import { favorites } from '$lib/stores/favorites.svelte';
	import FavoriteButton from './FavoriteButton.svelte';
	import StarOutline from './icons/StarOutline.svelte';
	import StarSolid from './icons/StarSolid.svelte';

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

<details>
	<summary class="cursor-pointer">
		<h2 class="inline text-xl font-semibold hover:text-slate-600">
			{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
		</h2></summary
	>
	<div class="space-y-6 pt-4">
		<button
			type="button"
			aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			onclick={handleToggleFavorite}
			class="gap3 flex items-center rounded-full px-16 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-200 lg:rounded-lg"
		>
			{#if isFavorite}
				<StarSolid class="h-5 w-5 text-yellow-500" />
			{:else}
				<StarOutline class="h-5 w-5 text-slate-400" />
			{/if}
		</button>
	</div>
</details>
