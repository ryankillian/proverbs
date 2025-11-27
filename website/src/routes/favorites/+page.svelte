<script lang="ts">
	import { favorites } from '$lib/stores/favorites.svelte';
	import Seo from '$lib/components/Seo.svelte';

	// The list of favorites now comes directly from our reactive store
	const favoriteProverbs = $derived(favorites.state.proverbs);
</script>

<Seo
	title="Your Favorite Proverbs"
	description="A personal collection of your saved proverbs."
	noindex={true}
/>
<div class="prose mx-auto max-w-3xl">
	<h2 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">Favorite Proverbs</h2>

	{#if favoriteProverbs.length > 0}
		<p class="mb-6 text-slate-600">
			You have {favoriteProverbs.length} saved {favoriteProverbs.length === 1
				? 'proverb'
				: 'proverbs'}.
		</p>
		<ul class="not-prose list-none space-y-1 pl-0">
			{#each favoriteProverbs as p}
				<li>
					<a href={`/proverbs/${p.proverb_id}`} class="tp_a">
						<span class="tp_b">{p.proverb_id}</span>
						<span class="tp_c">{p.proverb_text}</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-slate-600">
			You haven't saved any favorites yet. Click the star icon on a proverb's page to save it.
		</p>
	{/if}
</div>
