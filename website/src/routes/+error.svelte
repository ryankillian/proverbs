<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page Not Found - TilleyProverbs.com</title>
</svelte:head>

<!-- This wrapper keeps the styling consistent with your other text pages -->
<div class="prose mx-auto text-center">
	<h1 class="text-6xl font-bold text-slate-400">{page.status}</h1>
	<h2 class="text-2xl font-semibold text-slate-800">Page Not Found</h2>
	<p class="text-slate-600">Sorry, we couldn't find the page you were looking for.</p>
	<p class="mt-8">
		<a
			href="/"
			class="rounded-md bg-slate-600 px-4 py-2 text-white no-underline shadow-sm transition hover:bg-slate-700"
		>
			Return to Homepage
		</a>
	</p>
</div>
