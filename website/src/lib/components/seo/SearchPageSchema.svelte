<script lang="ts">
	import StructuredData from '$lib/components/StructuredDataSchema.svelte';
	import type { GraphSchema } from '$lib/types';

	let {
		pageUrl,
		title,
		description,
		imageUrl
	}: {
		pageUrl: string;
		title: string;
		description: string;
		imageUrl: string;
	} = $props();

	const domain = 'https://tilleyproverbs.com';

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['WebPage', 'SearchResultsPage'],
				'@id': `${pageUrl}#page`,
				url: pageUrl,
				name: title,
				description: description,
				inLanguage: 'en',
				isPartOf: { '@id': `${domain}/#website` },
				primaryImageOfPage: { '@id': `${pageUrl}#og-image` },
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` }
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${pageUrl}#breadcrumb`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: `${domain}/`
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Search',
						item: pageUrl
					}
				]
			},
			{
				'@type': 'ImageObject',
				'@id': `${pageUrl}#og-image`,
				url: imageUrl,
				width: 1200,
				height: 630
			}
		]
	};
</script>

<StructuredData {schema} />
