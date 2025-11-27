<script lang="ts">
	import type { AnalysisEntry } from '$lib/types';

	let { analysisEntry }: { analysisEntry: AnalysisEntry } = $props();

	function formatDate(isoString: string) {
		return new Date(isoString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="prose prose-slate max-w-none space-y-4 font-serif">
	{#if analysisEntry.analysis.literal_meaning}
		<p>{analysisEntry.analysis.literal_meaning}</p>
	{/if}

	{#if analysisEntry.analysis.metaphorical_meanings?.length > 0}
		<section>
			<h3>Insights</h3>
			{#each analysisEntry.analysis.metaphorical_meanings as item}
				<h4>{item.theme}</h4>
				<p>{item.description}</p>
			{/each}
			{#each analysisEntry.analysis.insights as item}
				<h4>{item.theme}</h4>
				<p>{item.description}</p>
			{/each}
		</section>
	{/if}

	<!-- {#if analysisEntry.analysis.metaphorical_meanings?.length > 0}
		<section>
			<h3>Metaphorical Meanings</h3>
			{#each analysisEntry.analysis.metaphorical_meanings as item}
				<h4>{item.theme}</h4>
				<p>{item.description}</p>
			{/each}
		</section>
	{/if}

	{#if analysisEntry.analysis.insights?.length > 0}
		<section>
			<h3>Additional Insights</h3>
			{#each analysisEntry.analysis.insights as item}
				<h4>{item.theme}</h4>
				<p>{item.description}</p>
			{/each}
		</section>
	{/if} -->

	{#if analysisEntry.analysis.stylistic_features?.length > 0}
		<section>
			<h3>Rhetorical Devices</h3>
			{#each analysisEntry.analysis.stylistic_features as item}
				<h4>{item.device}</h4>
				<p>{item.description}</p>
			{/each}
		</section>
	{/if}

	{#if analysisEntry.analysis.tags?.length > 0}
		<section class="mt-6">
			<div class="flex flex-wrap justify-center gap-2 font-sans">
				{#each analysisEntry.analysis.tags as tag}
					<span class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
						{tag}
					</span>
				{/each}
			</div>
		</section>
	{/if}

	<div class="mt-6 border-slate-200 pt-2 text-right font-sans text-xs text-slate-600">
		Analyzed with {analysisEntry.model_name} on {formatDate(analysisEntry.analysis_date)}
	</div>
</div>
