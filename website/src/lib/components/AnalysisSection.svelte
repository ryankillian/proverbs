<!-- <script lang="ts">
	import AnalysisCard from './AnalysisCard.svelte';

	let { open = $bindable(), analyses }: { open: boolean; analyses: any[] } = $props();
</script>

<details bind:open>
	<summary class="cursor-pointer">
		<h2 class="inline text-xl font-semibold hover:text-slate-600">Meaning & Analysis</h2></summary
	>
	<div class="space-y-6 pt-4">
		{#each analyses as analysisEntry}
			<div class="rounded-lg p-4 lg:border lg:border-slate-200">
				<AnalysisCard {analysisEntry} />
			</div>
		{/each}
	</div>
</details> -->

<script lang="ts">
	import AnalysisCard from './AnalysisCard.svelte';

	let { analyses }: { analyses: any[] } = $props();
</script>

<!-- <section>
	<h2 class="text-xl font-semibold">Meaning & Analysis</h2>
	<div class="space-y-6 pt-4">
		{#each analyses as analysisEntry}
			<div class="rounded-lg p-4 lg:border lg:border-slate-200">
				<AnalysisCard {analysisEntry} />
			</div>
		{/each}
	</div>
</section> -->

<section>
	<details open>
		<summary class="cursor-pointer">
			<h2 class="inline text-xl font-semibold hover:text-slate-600">Meaning & Analysis</h2></summary
		>
		<div class="pt-4">
			{#each analyses as analysisEntry}
				<div class="rounded-lg p-4 lg:border lg:border-slate-200">
					<AnalysisCard {analysisEntry} />
				</div>
			{/each}
		</div>
	</details>
</section>
