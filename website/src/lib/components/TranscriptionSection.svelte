<!-- <script lang="ts">
	import type { Proverb } from '$lib/types';
	import ProverbCard from './ProverbCard.svelte';

	let {
		open = $bindable(),
		proverb,
		validXrefs
	}: {
		open: boolean;
		proverb: Proverb;
		validXrefs: Set<string>;
	} = $props();
</script>

<details bind:open>
	<summary class="cursor-pointer">
		<h2 class="inline text-xl font-semibold hover:text-slate-600">Transcription</h2></summary
	>
	<div class="pt-4">
		<div class=" space-y-6 rounded-lg p-4 lg:border lg:border-slate-200">
			<ProverbCard {proverb} {validXrefs} />
		</div>
	</div>
</details> -->

<script lang="ts">
	import type { Proverb } from '$lib/types';
	import ProverbCard from './ProverbCard.svelte';

	let {
		proverb,
		validXrefs
	}: {
		proverb: Proverb;
		validXrefs: Set<string>;
	} = $props();
</script>

<!-- <section>
	<h2 class="text-xl font-semibold">Transcription</h2>
	<div class="mt-4 rounded-lg border border-slate-200 p-4">
		<ProverbCard {proverb} {validXrefs} />
	</div>
</section> -->
<section>
	<details open>
		<summary class="cursor-pointer">
			<h2 class="inline text-xl font-semibold hover:text-slate-600">Transcription</h2></summary
		>
		<div class="pt-4">
			<div class=" space-y-6 rounded-lg p-4 lg:border lg:border-slate-200">
				<ProverbCard {proverb} {validXrefs} />
			</div>
		</div>
	</details>
</section>
