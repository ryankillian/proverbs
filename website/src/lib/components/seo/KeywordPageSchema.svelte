<script lang="ts">
	import StructuredDataSchema from '$lib/components/StructuredDataSchema.svelte';
	import type { GraphSchema, ProverbSummary } from '$lib/types';

	type BreadcrumbItem = { name: string; item: string };

	let {
		keywordName,
		proverbs,
		pageUrl,
		breadcrumb
	}: {
		keywordName: string;
		proverbs: ProverbSummary[];
		pageUrl: string;
		breadcrumb: BreadcrumbItem[];
	} = $props();

	const domain = 'https://tilleyproverbs.com';
	const itemsToInclude = 10; // Define how many items to show in the schema

	const toTitleCase = (str: string) =>
		str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['WebPage', 'CollectionPage'],
				'@id': `${pageUrl}#page`,
				url: pageUrl,
				name: `${proverbs.length} proverbs containing “${toTitleCase(keywordName)}”`,
				description: `Showing a sample of ${proverbs.length} early-modern English proverbs that include the word “${toTitleCase(keywordName)}”.`,
				inLanguage: 'en',
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
				about: { '@id': `${pageUrl}#keyword` },
				mainEntity: { '@id': `${pageUrl}#proverbList` },
				isPartOf: { '@id': `${domain}/#website` }
			},
			{
				'@type': 'DefinedTerm',
				'@id': `${pageUrl}#keyword`,
				name: toTitleCase(keywordName),
				inDefinedTermSet: `${domain}/keywords`
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#proverbList`,
				name: `Proverbs with keyword: ${toTitleCase(keywordName)}`,
				numberOfItems: proverbs.length,
				itemListOrder: 'https://schema.org/ItemListOrderAscending',
				itemListElement: proverbs.slice(0, itemsToInclude).map((p, index) => {
					const proverbUrl = `${domain}/proverbs/${p.proverb_id}`;
					return {
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'DefinedTerm',
							'@id': proverbUrl,
							url: proverbUrl,
							name: p.proverb_text,
							image: `${domain}/images/proverbs/${p.proverb_id[0]}/${p.proverb_id}_1.webp`
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
