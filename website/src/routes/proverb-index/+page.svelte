<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	let { data } = $props();
	const { seo } = $derived(data);
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>
<Seo {...seo} />

<div class="prose mx-auto max-w-3xl">
	<h1 class="mb-4">Complete Proverb Index</h1>
	<p class="text-slate-600">
		A full list of all {data.proverbs.length} proverbs in the collection.
	</p>

	<ul class="not-prose list-none space-y-1 pl-0">
		{#each data.proverbs as p}
			<li>
				<a href={`/proverbs/${p.proverb_id}`} class="tp_a">
					<span class="tp_b">
						{p.proverb_id}
					</span>
					<span class="tp_c">
						{p.proverb_text}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
