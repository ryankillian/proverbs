<script lang="ts">
	import type { GraphSchema } from '$lib/types';
	import StructuredDataSchema from '$lib/components/StructuredDataSchema.svelte';

	interface ListItem {
		name: string;
		url: string;
	}

	let {
		letters,
		collections
	}: {
		letters: ListItem[];
		collections: ListItem[];
	} = $props();

	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}/`;

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${pageUrl}#website`,
				url: pageUrl,
				name: 'Tilley’s Proverbs',
				publisher: { '@id': `${pageUrl}#organization` }
			},
			{
				'@type': ['WebPage', 'HomePage', 'CollectionPage'],
				'@id': `${pageUrl}#homepage`,
				url: pageUrl,
				name: 'A Collection of Historical English Proverbs',
				description:
					"Explore over 10,000 proverbs from Tilley's Dictionary, browsable by letter or through curated collections like Shakespeare and the Bible.",
				isPartOf: { '@id': `${pageUrl}#website` },
				// --- FIX #1: Use `hasPart` instead of `mainEntity` for multiple items ---
				hasPart: [{ '@id': `${pageUrl}#letters` }, { '@id': `${pageUrl}#collections` }]
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#letters`,
				name: 'Alphabetical Index (A–Z)',
				itemListElement: letters.map((item, index) => {
					const itemUrl = `${domain}${item.url}`;
					return {
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'CollectionPage',
							'@id': itemUrl,
							url: itemUrl,
							name: item.name
						}
					};
				})
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#collections`,
				name: 'Curated Collections',
				itemListElement: collections.map((item, index) => {
					const itemUrl = `${domain}${item.url}`;
					return {
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'CollectionPage',
							'@id': itemUrl,
							url: itemUrl,
							name: item.name
						}
					};
				})
			},
			{
				'@type': 'Organization',
				'@id': `${pageUrl}#organization`,
				name: 'TilleyProverbs.com',
				url: pageUrl,
				logo: {
					'@type': 'ImageObject',
					'@id': `${pageUrl}#logo`,
					url: `${domain}/images/og/tilley.webp`,
					width: 1200,
					height: 630
				}
			}
		]
	} as const;
</script>

<StructuredDataSchema {schema} />
