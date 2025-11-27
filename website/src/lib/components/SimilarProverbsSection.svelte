<!-- <script lang="ts">
	import type { ProverbSummary } from '$lib/types';
	import SimilarProverbsCard from './SimilarProverbsCard.svelte';

	let {
		open = $bindable(),
		similarProverbs
	}: {
		open: boolean;
		similarProverbs: ProverbSummary[];
	} = $props();
</script>

<details bind:open>
	<summary class="cursor-pointer">
		<h2 class="inline text-xl font-semibold hover:text-slate-600">Similar Proverbs</h2></summary
	>
	<div class="pt-4">
		<div class="space-y-6 rounded-lg sm:p-0 lg:border lg:border-slate-200">
			<SimilarProverbsCard {similarProverbs} />
		</div>
	</div>
</details> -->

<script lang="ts">
	import type { SimilarProverbWithSummary } from '$lib/types';
	import SimilarProverbsCard from './SimilarProverbsCard.svelte';

	let {
		similarProverbs
	}: {
		similarProverbs: SimilarProverbWithSummary[];
	} = $props();
</script>

<section>
	<details open>
		<summary class="cursor-pointer">
			<h2 class="inline text-xl font-semibold hover:text-slate-600">Related Proverbs</h2></summary
		>
		<div class="pt-4">
			<div class=" space-y-6 rounded-lg p-4 lg:border lg:border-slate-200">
				<SimilarProverbsCard {similarProverbs} />
			</div>
		</div>
	</details>
</section>
