<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import HomepageSchema from '$lib/components/seo/HomepageSchema.svelte';
	let { data } = $props();
	// let { letters, totalProverbCount, lettersForSchema, collectionsForSchema, seo } = data;
	const { letters, totalProverbCount, lettersForSchema, collectionsForSchema, seo } =
		$derived(data);

	const collections = [
		{ name: 'Bible', href: '/collections/bible' },
		{ name: 'Shakespeare', href: '/collections/shakespeare' },
		{ name: 'Erasmus', href: '/collections/erasmus' },
		{ name: 'Dryden', href: '/collections/dryden' },
		{ name: 'Spenser', href: '/collections/spenser' },
		{ name: 'Milton', href: '/collections/milton' },
		{ name: 'Chapman', href: '/collections/chapman' },
		{ name: 'Massinger', href: '/collections/massinger' },
		{ name: 'Dekker', href: '/collections/dekker' },
		{ name: 'Marlowe', href: '/collections/marlowe' },
		{ name: 'Don Quixote', href: '/collections/don-quixote' },
		{ name: 'Italian Proverbs', href: '/collections/italian-proverbs' },
		{ name: 'French Proverbs', href: '/collections/french-proverbs' },
		{ name: 'Spanish Proverbs', href: '/collections/spanish-proverbs' },
		{ name: 'British Proverbs', href: '/collections/british-proverbs' },
		{ name: 'English Proverbs', href: '/collections/english-proverbs' },
		{ name: 'Hobbes', href: '/collections/hobbes' },
		{ name: 'Franklin', href: '/collections/franklin' },
		{ name: 'Greene', href: '/collections/greene' },
		{ name: 'Middleton', href: '/collections/middleton' },
		{ name: 'Lyly', href: '/collections/lyly' },
		{ name: 'Ben Jonson', href: '/collections/jonson' },
		{ name: 'Beaumont and Fletcher', href: '/collections/beaumont-fletcher' },
		{ name: "L'Estrange", href: '/collections/lestrange' },
		{ name: 'Sidney', href: '/collections/sidney' },
		{ name: 'Swift', href: '/collections/swift' }
	];
</script>

<Seo {...seo} />
<HomepageSchema letters={lettersForSchema} collections={collectionsForSchema} />

<div class="prose mx-auto max-w-5xl">
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">Browse by Letter</h1>

	<div class="grid grid-cols-2 gap-4 md:grid-cols-7">
		{#each letters as item}
			{#if item.count > 0}
				<a href={`/letters/${item.letter}`} class="tp_m u">
					<span class="tp_o">{item.letter}</span>
					<span class="tp_p">{item.count} proverbs</span>
				</a>
			{:else}
				<div class="tp_n">
					<span class="tp_o">{item.letter}</span>
					<span class="tp_p">0 proverbs</span>
				</div>
			{/if}
		{/each}

		<a href="/proverb-index" class="tp_m u">
			<span class="tp_o">Index</span>
			<span class="tp_p">{totalProverbCount} proverbs</span>
		</a>
	</div>

	<div class="mt-12">
		<h2 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">Special Collections</h2>

		<div class="flex flex-wrap gap-3">
			{#each collections as c}
				<a href={c.href} class="tp_h u">{c.name}</a>
			{/each}
		</div>
	</div>
</div>
