<script lang="ts">
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import SearchPageSchema from '$lib/components/seo/SearchPageSchema.svelte';
	let { data } = $props();
	const { allProverbs, seo, pageUrl } = data;

	let searchTerm = $state('');

	const filteredProverbs = $derived(() => {
		const term = searchTerm.trim().toLowerCase();
		if (term.length < 2) {
			return [];
		}
		return allProverbs.filter((p) => p.proverb_text.toLowerCase().includes(term));
	});
</script>

<Seo {...seo} />
<SearchPageSchema
	title={seo.title}
	description={seo.description}
	imageUrl={seo.imageUrl}
	{pageUrl}
/>

<div class="prose mx-auto max-w-3xl">
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">Search Proverbs</h1>
	<p class="text-slate-600">
		Search all {allProverbs.length.toLocaleString()} proverbs in the collection.
	</p>

	<div class="not-prose relative my-8">
		<input
			type="search"
			bind:value={searchTerm}
			placeholder="Enter a word (e.g., horse, cart, water)..."
			class="w-full rounded-full border border-slate-300 py-3 pr-4 pl-12 text-lg focus:border-slate-500 focus:ring-0 focus:ring-slate-500 focus:outline-none"
			aria-label="Search proverbs"
		/>
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
			<SearchIcon class="h-5 w-5 text-slate-400" />
		</div>
	</div>

	<!-- Results Section -->

	{#if searchTerm.length >= 2}
		<p class="mb-4 text-sm text-slate-500">
			Found {filteredProverbs().length} matching proverbs.
		</p>

		{#if filteredProverbs().length > 0}
			<ul class="not-prose list-none space-y-1 pl-0">
				{#each filteredProverbs() as p (p.proverb_id)}
					<li>
						<a
							href={`/proverbs/${p.proverb_id}`}
							class="hover:bg-slate-100; flex items-baseline rounded-lg p-2 no-underline transition-colors"
						>
							<span
								class="w-10 flex-shrink-0 font-mono text-sm font-semibold text-slate-500 sm:w-16"
								>{p.proverb_id}</span
							>
							<span
								class="ml-2 font-serif text-slate-800 hover:text-slate-900 hover:underline sm:ml-4"
								>{p.proverb_text}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-center text-slate-500">No matches found.</p>
		{/if}
	{/if}
</div>
