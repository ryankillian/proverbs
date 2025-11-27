<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		onclick?: () => void;
		children: Snippet;
		'aria-label'?: string;
	}

	let { href, onclick, children, 'aria-label': ariaLabel }: Props = $props();
</script>

{#if href}
	<a {href} aria-label={ariaLabel} class="tp_q">
		{@render children()}
	</a>
{:else}
	<button type="button" {onclick} aria-label={ariaLabel} class="tp_q">
		{@render children()}
	</button>
{/if}
