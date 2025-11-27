<script lang="ts">
	import PageNav from '$lib/components/PageNav.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import ProverbPageSchema from '$lib/components/seo/ProverbPageSchema.svelte';
	import TranscriptionSection from '$lib/components/TranscriptionSection.svelte';
	import AnalysisSection from '$lib/components/AnalysisSection.svelte';
	import SimilarProverbsSection from '$lib/components/SimilarProverbsSection.svelte';
	import ImageSection from '$lib/components/ImageSection.svelte';
	import ChevronLeft from '$lib/components/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';

	let { data } = $props();
	const {
		proverb,
		prev,
		next,
		validXrefs,
		similarProverbs,
		seo,
		analyses,
		pageUrl,
		breadcrumb,
		dims1,
		dims2
	} = $derived(data);
</script>

<Seo {...seo} />
<ProverbPageSchema
	{proverb}
	{pageUrl}
	{similarProverbs}
	{analyses}
	{breadcrumb}
	imageDimensions={dims1}
/>

<div class="mx-auto">
	{#if prev}
		<a
			href={`/proverbs/${prev}`}
			aria-label={`Previous proverb: ${prev}`}
			class="absolute top-4 left-1 z-10 transition-transform hover:scale-110 lg:hidden"
		>
			<ChevronLeft class="h-6 w-6 text-slate-600" />
		</a>
	{/if}

	{#if next}
		<a
			href={`/proverbs/${next}`}
			aria-label={`Next proverb: ${next}`}
			class="absolute top-4 right-1 z-10 transition-transform hover:scale-110 lg:hidden"
		>
			<ChevronRight class="h-6 w-6 text-slate-600" />
		</a>
	{/if}

	{#key proverb.proverb_id}
		<PageHeader {proverb} {prev} {next} />
		<article class="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2 lg:items-start">
			<div class="prose max-w-none space-y-12">
				<div id="transcription" class="scroll-mt-24">
					<TranscriptionSection {proverb} {validXrefs} />
				</div>

				{#if analyses && analyses.length > 0}
					<div id="analysis" class="scroll-mt-24">
						<AnalysisSection {analyses} />
					</div>
				{/if}

				{#if similarProverbs && similarProverbs.length > 0}
					<div id="similar" class="scroll-mt-24">
						<SimilarProverbsSection {similarProverbs} />
					</div>
				{/if}
			</div>

			<div class="lg:sticky lg:top-8">
				<div id="scan" class="scroll-mt-24">
					<ImageSection {proverb} {dims1} {dims2} />
				</div>
			</div>
		</article>
	{/key}
</div>
