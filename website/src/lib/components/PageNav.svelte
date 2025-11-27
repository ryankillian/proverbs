<script lang="ts">
	// 1. Import the new icon components
	import ChevronLeft from '$lib/components/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';

	let { prev, next } = $props<{ prev?: string; next?: string }>();
</script>

<!--
  This component now renders two sets of navigation controls,
  and uses Tailwind's responsive prefixes (`lg:hidden`, `lg:block`)
  to show the correct one based on screen size.
-->

<!-- MODE 1: Floating Bottom-Corner Buttons for MOBILE -->
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

<!--
  MODE 2: Floating Side-Buttons for DESKTOP
  - `hidden lg:block`: These controls are hidden by default and only appear on large screens.
  - `fixed top-1/2`: Positions them vertically centered in the viewport.
  - `left-4` / `right-4`: Positions them near the edges of the screen.
  - `-translate-y-1/2`: A CSS trick to perfectly center the buttons vertically.
-->
{#if prev}
	<a
		href={`/proverbs/${prev}`}
		aria-label={`Previous proverb: ${prev}`}
		class="absolute top-9 left-4 z-10 hidden -translate-y-1/2 transition-transform hover:scale-101 lg:block"
	>
		<ChevronLeft class="h-8 w-8 text-slate-700" />
	</a>
{/if}

{#if next}
	<a
		href={`/proverbs/${next}`}
		aria-label={`Next proverb: ${next}`}
		class="absolute top-9 right-4 z-10 hidden -translate-y-1/2 p-3 transition-transform hover:scale-101 lg:block"
	>
		<ChevronRight class="h-8 w-8 text-slate-700" />
	</a>
{/if}
