<script lang="ts">
	import type { SimilarProverbWithSummary } from '$lib/types';

	let { similarProverbs }: { similarProverbs: SimilarProverbWithSummary[] } = $props();

	function formatScore(score: number): string {
		return `${(score * 100).toFixed(1)}%`;
	}
</script>

<div>
	{#if similarProverbs?.length > 0}
		<div class="space-y-1">
			{#each similarProverbs as p}
				<a href={`/proverbs/${p.proverb_id}`} class="sim-item u">
					<span class="sim-id">
						{p.proverb_id}
					</span>

					<span class="sim-text text-slate-800 underline hover:text-slate-900">
						{p.proverb_text}
					</span>

					<span class="sim-score">
						{formatScore(p.score)}
					</span>
				</a>
			{/each}
		</div>
		<div class="mt-6 border-slate-200 pt-2 text-center font-sans text-xs text-slate-600">
			These connections are generated using word-embeddings.
			<a href="/about#extra-features" class="text-slate-600 hover:underline">Learn more</a>.
		</div>
	{:else}
		<p class="p-3">No similar proverbs found.</p>
	{/if}
</div>
