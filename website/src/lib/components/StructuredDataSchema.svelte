<script lang="ts">
	import type { GraphSchema } from '$lib/types';
	const { schema } = $props<{ schema: GraphSchema }>();
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
