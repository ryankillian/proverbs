<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import StructuredData from '$lib/components/StructuredData.svelte';

	import TranscriptionSection from '$lib/components/TranscriptionSection.svelte';
	import AnalysisSection from '$lib/components/AnalysisSection.svelte';
	import SimilarProverbsSection from '$lib/components/SimilarProverbsSection.svelte';
	import ImageSection from '$lib/components/ImageSection.svelte';
	import FavoursitesSection from '$lib/components/FavoursitesSection.svelte';
	import { sectionsState } from '$lib/state/sections.svelte';
	import { browser } from '$app/environment';

	import { PUBLIC_SITE_VERSION } from '$env/static/public';

	let { data } = $props();
	const { proverb, prev, next, validXrefs, topSimilar, seo, analyses } = $derived(data);

	// const isFavorite = $derived(favorites.has(proverb.proverb_id));

	// function handleToggleFavorite() {
	// 	favorites.toggle({
	// 		proverb_id: proverb.proverb_id,
	// 		proverb_text: proverb.proverb_text
	// 	});
	// }

	const isTextVersion = PUBLIC_SITE_VERSION === 'text';
</script>

<Seo title={seo.title} description={seo.description} imageUrl={seo.imageUrl} />
<StructuredData data={seo.schema} />

<div class="mx-auto">
	<PageNav {prev} {next} />
	{#key proverb.proverb_id}
		{#if isTextVersion}
			<!-- RENDER TEXT-ONLY LAYOUT -->

			<article class="prose mx-auto max-w-3xl">
				<PageHeader {proverb} />
				<!-- <ProverbCard {proverb} {validXrefs} /> -->
				<div class="space-y-8">
					{#if browser}
						<TranscriptionSection bind:open={sectionsState.transcription} {proverb} {validXrefs} />
						{#if analyses && analyses.length > 0}
							<AnalysisSection bind:open={sectionsState.analysis} {analyses} />
						{/if}
						{#if topSimilar && topSimilar.length > 0}
							<SimilarProverbsSection
								bind:open={sectionsState.similar}
								similarProverbs={topSimilar}
							/>
						{/if}
						<!-- <div>
							<FavoursitesSection
								proverb_id={proverb.proverb_id}
								proverb_text={proverb.proverb_text}
							/>
						</div> -->
					{/if}
				</div>
			</article>
		{:else}
			<PageHeader {proverb} />
			<article class="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-2 lg:items-start">
				<!-- Column 1: The Transcription and Extras -->
				<div class="prose space-y-8">
					{#if browser}
						<TranscriptionSection bind:open={sectionsState.transcription} {proverb} {validXrefs} />
						{#if analyses && analyses.length > 0}
							<AnalysisSection bind:open={sectionsState.analysis} {analyses} />
						{/if}
						{#if topSimilar && topSimilar.length > 0}
							<SimilarProverbsSection
								bind:open={sectionsState.similar}
								similarProverbs={topSimilar}
							/>
						{/if}
					{/if}
				</div>

				<!-- Column 2: The Image Column -->
				<div class="lg:sticky lg:top-8">
					<div>
						<ImageSection bind:open={sectionsState.scan} {proverb} />
					</div>
					<!-- <div class="mt-8">
						<FavoursitesSection
							proverb_id={proverb.proverb_id}
							proverb_text={proverb.proverb_text}
						/>
					</div> -->
				</div>
			</article>
		{/if}
		<!-- 
  The container div now uses responsive justification.
  - `justify-center`: The default, for mobile.
  - `lg:justify-start`: On large screens, it switches to left-alignment.
-->
	{/key}
</div>
