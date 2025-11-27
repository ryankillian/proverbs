<script lang="ts">
	import type { GraphSchema } from '$lib/types';
	import StructuredDataSchema from '../StructuredDataSchema.svelte';

	type GroupItem = { name: string; url: string; slug: string; count: number };
	type BreadcrumbItem = { name: string; item: string };

	let {
		collectionName,
		groups,
		pageUrl,
		breadcrumb
	}: {
		collectionName: string;
		groups: GroupItem[];
		pageUrl: string;
		breadcrumb: BreadcrumbItem[];
	} = $props();

	const domain = 'https://tilleyproverbs.com';

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': ['WebPage', 'CollectionPage'],
				'@id': `${pageUrl}#page`,
				url: pageUrl,
				name: `Proverbs from ${collectionName}`,
				description: `Explore proverbs from the works of ${collectionName}, grouped by play or book.`,
				inLanguage: 'en',
				isPartOf: { '@id': `${domain}/#website` },
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
				mainEntity: { '@id': `${pageUrl}#workList` }
			},
			{
				'@type': 'ItemList',
				'@id': `${pageUrl}#workList`,
				name: `Works in the ${collectionName} Collection`,
				numberOfItems: groups.length,
				itemListOrder: 'Ascending',
				itemListElement: groups.map((group, index) => {
					const itemUrl = `${pageUrl}#${group.slug}`;
					return {
						'@type': 'ListItem',
						position: index + 1,
						item: {
							'@type': 'CollectionPage',
							'@id': itemUrl,
							url: itemUrl,
							name: `${group.name} (${group.count} proverbs)`
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
