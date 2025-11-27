<script lang="ts">
	import type { GraphSchema, ProverbSummary } from '$lib/types';
	import StructuredDataSchema from '../StructuredDataSchema.svelte';

	type LetterGroup = {
		letter: string;
		proverbs: any[];
	};

	let { letterGroups, firstProverbs }: { letterGroups: any[]; firstProverbs: ProverbSummary[] } =
		$props();

	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}/proverb-index`;
	const totalItems = letterGroups.reduce((sum, group) => sum + group.proverbs.length, 0);

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['WebPage', 'CollectionPage'],
				'@id': `${pageUrl}#page`,
				url: pageUrl,
				name: 'Complete A-Z Index of Proverbs',
				description: `A complete alphabetical index of all ${totalItems.toLocaleString()} proverbs in Tilley's Dictionary.`,
				inLanguage: 'en',
				isPartOf: { '@id': `${domain}/#website` },
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
				mainEntity: { '@id': `${pageUrl}#main-list` } // Added mainEntity
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#main-list`,
				name: 'Proverb Index',
				description: `List of all ${totalItems.toLocaleString()} proverbs, grouped alphabetically (sample shown).`,
				inLanguage: 'en', // Added inLanguage
				numberOfItems: totalItems,
				itemListOrder: 'Ascending', // Use plain token for consistency
				// Add a sample of items to avoid an empty list
				itemListElement: firstProverbs.map((p, index) => {
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
						name: 'Proverb Index',
						item: pageUrl
					}
				]
			}
		]
	};
</script>

<StructuredDataSchema {schema} />
