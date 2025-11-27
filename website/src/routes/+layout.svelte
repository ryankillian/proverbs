<script lang="ts">
	import '../app.css';
	import HeaderButton from '$lib/components/HeaderButton.svelte';
	import buildInfo from '$lib/utils/build-info.json';
	import Analytics from '$lib/components/Analytics.svelte';

	import { PUBLIC_SITE_VERSION } from '$env/static/public';
	import { page } from '$app/state';

	const lastUpdated = new Date(buildInfo.buildTime).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const isTextVersion = PUBLIC_SITE_VERSION === 'text';

	const toggleUrl = isTextVersion
		? `https://tilleyproverbs.com${page.url.pathname}`
		: `https://text.tilleyproverbs.com${page.url.pathname}`;

	const toggleText = isTextVersion ? 'View Full Site with Images' : 'View Text-Only Version';
	let { children } = $props();
</script>

<Analytics />
<!-- <SectionStateManager /> -->
<div class="flex min-h-screen flex-col">
	<!-- +layout.svelte (header section only) -->
	<header class="relative bg-white shadow">
		<!--
		The arrows from PageNav are absolutely positioned at the extreme
		left / right of this header.  Padding (px-12 → px-20) reserves
		enough room so they never cover the four centred items.
	-->
		<nav
			class="mx-auto flex w-full max-w-5xl items-center justify-center gap-3 px-12
		       py-3 sm:gap-8 sm:px-20 sm:py-4"
		>
			<HeaderButton href="/">
				<span class="hidden text-xl font-bold sm:inline">Tilley’s Proverbs</span>
				<span class="font-bold sm:hidden">Proverbs</span>
			</HeaderButton>

			<HeaderButton href="/keywords">
				<span class="hidden sm:inline">Key Words</span>
				<span class="sm:hidden">Words</span>
			</HeaderButton>

			<HeaderButton href="/random">
				<span class="hidden sm:inline">Random Proverb</span>
				<span class="sm:hidden">Random</span>
			</HeaderButton>

			<HeaderButton href="/search">
				<span class="hidden sm:inline">Search</span>
				<span class="sm:hidden">Search</span>
			</HeaderButton>
		</nav>
	</header>

	<main class="mx-auto w-11/12 max-w-7xl flex-grow py-6">
		{@render children()}
	</main>

	<footer class="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
		<!-- <div class="mb-4">
			<a href={toggleUrl} class="text-slate-600 underline hover:text-slate-800 hover:no-underline">
				{toggleText}
			</a>
		</div> -->
		<p class="space-x-2">
			<span>© {new Date().getFullYear()} TilleyProverbs.com</span>
			<span>·</span>
			<a href="/about" class="text-slate-600 underline hover:text-slate-800">About</a>
		</p>
		<p class="mt-2 text-xs text-slate-600">
			Last updated: {lastUpdated}
		</p>
	</footer>
</div>
