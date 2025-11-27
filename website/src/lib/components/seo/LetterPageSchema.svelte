<script lang="ts">
	import StructuredDataSchema from '../StructuredDataSchema.svelte';
	import type { GraphSchema, ProverbSummary } from '$lib/types';

	type BreadcrumbItem = { name: string; item: string };

	let {
		letter,
		proverbs,
		pageUrl,
		breadcrumb
	}: {
		letter: string;
		proverbs: ProverbSummary[];
		pageUrl: string;
		breadcrumb: BreadcrumbItem[];
	} = $props();

	const domain = 'https://tilleyproverbs.com';
	const itemsToInclude = 30;

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['WebPage', 'CollectionPage'],
				'@id': `${pageUrl}#page`,
				url: pageUrl,
				name: `Proverbs Starting with Letter "${letter}"`,
				description: `Showing a sample of ${itemsToInclude} of the total ${proverbs.length} proverbs starting with the letter ${letter}.`,
				inLanguage: 'en',
				isPartOf: { '@id': `${domain}/#website` },
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
				mainEntity: { '@id': `${pageUrl}#proverbList` }
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#proverbList`,
				name: `Proverbs Starting with "${letter}"`,
				inLanguage: 'en',
				numberOfItems: proverbs.length,
				itemListOrder: 'Ascending',
				itemListElement: proverbs.slice(0, itemsToInclude).map((p, index) => {
					const proverbUrl = `${domain}/proverbs/${p.proverb_id}`;
					return {
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'DefinedTerm',
							'@id': proverbUrl,
							url: proverbUrl,
							name: p.proverb_text
						}
					};
				})
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${pageUrl}#breadcrumb`,
				itemListElement: breadcrumb.map((crumb, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					name: crumb.name,
					item: crumb.item
				}))
			}
		]
	};
</script>

<StructuredDataSchema {schema} />
