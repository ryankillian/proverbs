<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import LetterPageSchema from '$lib/components/seo/LetterPageSchema.svelte';

	let { data } = $props();
	let { letter, proverbs, seo, pageUrl, breadcrumb, count } = data;
</script>

<Seo {...seo} />
<LetterPageSchema {letter} {proverbs} {pageUrl} {breadcrumb} />

<div class="prose mx-auto max-w-3xl">
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">
		Proverbs starting with "{letter}"
	</h1>

	{#if proverbs.length > 0}
		<p class="mb-6 text-slate-600">
			Displaying {count.toLocaleString()} proverbs. Click on any proverb below to view the full analysis
			and original text.
		</p>
	{/if}

	{#if proverbs.length > 0}
		<ul class="not-prose list-none space-y-1 pl-0">
			{#each proverbs as p}
				<li>
					<a href={`/proverbs/${p.proverb_id}`} class="tp_a">
						<span class="tp_b">{p.proverb_id}</span>
						<span class="tp_c">{p.proverb_text}</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-slate-600">No proverbs found for this letter.</p>
	{/if}
</div>
