<script lang="ts">
	import StructuredDataSchema from '$lib/components/StructuredDataSchema.svelte';
	import type { GraphSchema } from '$lib/types';

	type KeywordItem = {
		name: string;
		slug: string;
		count: number;
	};

	let { keywords }: { keywords: KeywordItem[] } = $props();

	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}/keywords`;
	const itemsToInclude = 30; // Define how many keywords to include in the schema

	const toTitleCase = (str: string) => {
		return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
	};

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['WebPage', 'CollectionPage'],
				'@id': `${pageUrl}#page`,
				url: pageUrl,
				name: 'Browse Proverbs by Keyword',
				description: `An index of ${keywords.length} keywords from Tilley's Dictionary, sorted by frequency. The most common terms are highlighted below.`,
				inLanguage: 'en',
				isPartOf: { '@id': `${domain}/#website` },
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
				mainEntity: { '@id': `${pageUrl}#keywordIndex` }
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#keywordIndex`,
				name: 'Keyword Index (Top 30)',
				description: `A sample of the most frequent keywords. Full list of ${keywords.length} available on page.`,
				itemListOrder: 'Descending',
				numberOfItems: itemsToInclude,
				itemListElement: keywords.slice(0, itemsToInclude).map((kw, index) => {
					const itemUrl = `${domain}/keywords/${kw.slug}`;
					return {
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'DefinedTerm',
							'@id': itemUrl,
							url: itemUrl,
							name: toTitleCase(kw.name),
							additionalProperty: {
								'@type': 'PropertyValue',
								name: 'proverbCount',
								value: kw.count
							}
						}
					};
				})
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
						name: 'Keywords',
						item: pageUrl
					}
				]
			}
		]
	};
</script>

<StructuredDataSchema {schema} />
