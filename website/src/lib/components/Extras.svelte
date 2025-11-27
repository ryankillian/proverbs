<script lang="ts">
	import type { SimilarProverbWithSummary } from '$lib/types';
	import SimilarityList from './SimilarityList.svelte';

	interface Props {
		topSimilar: SimilarProverbWithSummary[];
	}

	let { topSimilar }: Props = $props();

	// The `open` attribute makes it expanded by default.
	// In production, remove `open` to have it closed by default.
</script>

<!-- The component is now just a <details> block within a <section> -->
<section>
	<!-- 1. Add the same horizontal rule as other sections -->
	<hr class="my-6" />

	<details open>
		<!-- 
          2. The <summary> is styled to look identical to an <h3>
             - `mt-0 mb-3`: Matches the heading margins.
             - `text-lg font-semibold`: Matches the heading font style.
        -->
		<summary class="mt-0 mb-3 cursor-pointer list-none text-lg font-semibold text-slate-900">
			<span class="flex items-center gap-2">
				<span>Extras</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					class="h-4 w-4 opacity-50"
					><path
						fill-rule="evenodd"
						d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
		</summary>

		<!-- 3. The content inside is now simpler -->
		<div class="mt-4">
			<SimilarityList title="Thematically Similar Proverbs" items={topSimilar} />

			<!-- Placeholder for future LLM analysis -->
		</div>
	</details>
</section>

<style>
	details[open] > summary svg {
		transform: rotate(180deg);
		transition: transform 0.2s;
	}
	details > summary svg {
		transition: transform 0.2s;
	}
	/* `list-none` in Tailwind doesn't always remove the marker in all browsers */
	summary::-webkit-details-marker {
		display: none;
	}
</style>
