<script lang="ts">
	// import { page } from '$app/state';

	// import { PUBLIC_SITE_VERSION } from '$env/static/public';

	const {
		title,
		description,
		imageUrl = null,
		ogType = 'article',
		noindex = false,
		canonicalUrl
	} = $props<{
		title: string;
		description: string;
		imageUrl?: string | null;
		ogType?: string;
		noindex?: boolean;
		canonicalUrl: string;
	}>();

	/* derived */
	const siteName = "Tilley's Proverbs";
	// const fullTitle = $derived(() => (title === siteName ? title : `${title} | ${siteName}`));
	const socialTitle = $derived(title);
	// The title for Google Search results, which must be trimmed
	const pageTitle = $derived(() => {
		// Don't add "| Site Name" if it's already the site name (for the homepage)
		if (title === siteName) {
			return siteName;
		}
		// Trim the base title to a safe length before adding the brand
		// const baseTitle = title.length > 55 ? `${title.substring(0, 52).trim()}...` : title;
		const baseTitle = title;

		return `${baseTitle} | ${siteName}`;
	});
	// const canonicalHref = $derived(() => `https://tilleyproverbs.com${page.url.pathname}`);
	const canonicalHref = $derived(canonicalUrl);
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalHref} />

	<!-- {#if PUBLIC_SITE_VERSION === 'full'}
		<link
			rel="alternate"
			media="only screen and (max-width: 640px)"
			href={`https://text.tilleyproverbs.com${page.url.pathname}`}
		/>
	{/if} -->

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={socialTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Tilley’s Proverbs" />
	<meta property="og:url" content={canonicalHref} />

	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={socialTitle} />
	<meta name="twitter:description" content={description} />

	{#if imageUrl}
		<meta name="twitter:image" content={imageUrl} />
	{/if}
</svelte:head>
