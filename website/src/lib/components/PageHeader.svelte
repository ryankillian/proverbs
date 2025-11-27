<!-- <script lang="ts">
	import type { Proverb } from '$lib/types';
	import ChevronLeft from '$lib/components/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';

	let {
		proverb,
		prev,
		next
	}: {
		proverb: Proverb;
		prev?: string;
		next?: string;
	} = $props();
</script>

<header class="relative z-20 mb-12">
	<h1
		class="hidden items-baseline justify-between gap-x-4 text-3xl font-bold tracking-tight text-slate-800 lg:flex"
	>
		<span>{proverb.proverb_text}</span>

		<div class="flex-none">
			<a
				href={prev ? `/proverbs/${prev}` : '#'}
				aria-label="Previous proverb"
				class="inline-block rounded-md p-1.5 align-middle {prev
					? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
					: 'cursor-not-allowed text-slate-300'}"
			>
				<ChevronLeft class="h-5 w-5" />
			</a>
			<a
				href={next ? `/proverbs/${next}` : '#'}
				aria-label="Next proverb"
				class="inline-block rounded-md p-1.5 align-middle {next
					? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
					: 'cursor-not-allowed text-slate-300'}"
			>
				<ChevronRight class="h-5 w-5" />
			</a>
		</div>
	</h1>

	<h1 class="text-3xl font-bold tracking-tight text-slate-800 lg:hidden">
		{proverb.proverb_text}
	</h1>
</header> -->

<script lang="ts">
	import type { Proverb } from '$lib/types';
	import ChevronLeft from '$lib/components/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';

	let {
		proverb,
		prev,
		next
	}: {
		proverb: Proverb;
		prev?: string;
		next?: string;
	} = $props();
</script>

<header class="relative z-20 mb-12">
	<!-- Use a single H1 for all screen sizes -->
	<h1
		class="flex items-baseline justify-between gap-x-4 text-3xl font-bold tracking-tight text-slate-800"
	>
		<!-- The proverb text is always present -->
		<span>{proverb.proverb_text}</span>

		<!-- This div contains the desktop nav buttons and is hidden on mobile -->
		<div class="hidden flex-none lg:block">
			<a
				href={prev ? `/proverbs/${prev}` : '#'}
				aria-label="Previous proverb"
				class="inline-block rounded-md p-1.5 align-middle {prev
					? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
					: 'cursor-not-allowed text-slate-300'}"
			>
				<ChevronLeft class="h-5 w-5" />
			</a>
			<a
				href={next ? `/proverbs/${next}` : '#'}
				aria-label="Next proverb"
				class="inline-block rounded-md p-1.5 align-middle {next
					? 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
					: 'cursor-not-allowed text-slate-300'}"
			>
				<ChevronRight class="h-5 w-5" />
			</a>
		</div>
	</h1>
</header>
