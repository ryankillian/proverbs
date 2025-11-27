<script lang="ts">
	import type { Proverb } from '$lib/types';
	import ResponsiveScan from './ResponsiveScan.svelte';
	let {
		proverb,
		dims1,
		dims2
	}: {
		proverb: Proverb;
		dims1: { width: number; height: number };
		dims2?: { width: number; height: number };
	} = $props();

	const altTextBase = `${proverb.proverb_text} - a scanned entry from Tilley's 1950 Dictionary of Proverbs.`;
</script>

<figure class="m-0">
	<div class="flex h-fit flex-col items-center gap-4 pt-0">
		<ResponsiveScan
			proverbId={proverb.proverb_id}
			imageNum={1}
			altText={altTextBase}
			width={dims1.width}
			height={dims1.height}
		/>

		{#if proverb.image_count > 1 && dims2}
			<ResponsiveScan
				proverbId={proverb.proverb_id}
				imageNum={2}
				altText={`${altTextBase} (continuation)`}
				width={dims2.width}
				height={dims2.height}
			/>
		{/if}
	</div>

	<!-- Add the <figcaption> element for the attribution -->
	<figcaption class="mt-3 text-center text-xs text-slate-500">
		Scan courtesy of
		<a
			href="https://hdl.handle.net/2027/mdp.39015016495585"
			target="_blank"
			rel="noopener noreferrer"
			class="text-slate-600 underline hover:text-slate-800 hover:no-underline"
			>HathiTrust Digital Library</a
		>.
		<br />
		Used under
		<a
			href="https://creativecommons.org/licenses/by-nc/3.0/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-slate-600 underline hover:text-slate-800 hover:no-underline">CC BY-NC 3.0</a
		>.
	</figcaption>
</figure>
