<script lang="ts">
	import type { Proverb } from '$lib/types';
	import ImageColumn from './ImageColumn.svelte';

	let {
		proverb,
		dims1,
		dims2
	}: {
		proverb: Proverb;
		dims1: { width: number; height: number };
		dims2?: { width: number; height: number };
	} = $props();
</script>

<section>
	<details open>
		<summary class="cursor-pointer">
			<h2 class="inline text-xl font-semibold hover:text-slate-600">Original Scan</h2></summary
		>
		<div class="pt-4">
			<div class=" p-4">
				<ImageColumn {proverb} {dims1} {dims2} />
			</div>
		</div>
	</details>
</section>
