<script lang="ts">
	export let data;
	let { proverbs } = data;
</script>

<main>
	<h1>Proverbs List</h1>
	<ul>
		{#each proverbs as proverb}
			<li>
				<a href={`/proverb/${proverb.slug}`}>
					{proverb.metadata.proverb_text}
				</a>
			</li>
		{/each}
	</ul>
</main>
