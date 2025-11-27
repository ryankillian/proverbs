<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import KeywordsIndexSchema from '$lib/components/seo/KeywordsIndexSchema.svelte';
	let { data } = $props();
	const { keywords, seo } = data;
</script>

<Seo {...seo} />
<KeywordsIndexSchema {keywords} />

<div class="prose mx-auto max-w-7xl">
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">Browse by Keyword</h1>

	<div class="not-prose flex flex-wrap gap-3">
		{#each keywords as item}
			<a href={`/keywords/${item.slug}`} class="tp_h">
				{item.name} <span class="tp_i">({item.count})</span>
			</a>
		{/each}
	</div>
</div>
