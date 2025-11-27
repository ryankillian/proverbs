<script lang="ts">
	const { data } = $props<object>();
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(data)}</script>`}
</svelte:head>
