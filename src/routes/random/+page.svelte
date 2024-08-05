<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	let { slug } = data;

	onMount(() => {
		goto(`/proverb/${slug}`);
	});
</script>
