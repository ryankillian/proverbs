<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import KeywordPageSchema from '$lib/components/seo/KeywordPageSchema.svelte';
	export let data;
	const { keyword, proverbs, seo, pageUrl, breadcrumb, count } = data;
</script>

<Seo {...seo} />
<KeywordPageSchema keywordName={keyword} {proverbs} {pageUrl} {breadcrumb} />

<div class="prose mx-auto max-w-3xl">
	<div class="mb-6">
		<a href="/keywords" class="text-sm text-slate-500 no-underline hover:underline"
			>← Back to all keywords</a
		>
	</div>

	<h1 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">
		Proverbs with Keyword: <span class="text-slate-800">"{keyword}"</span>
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
		<p class="text-slate-600">No proverbs found for this catchword.</p>
	{/if}
</div>
