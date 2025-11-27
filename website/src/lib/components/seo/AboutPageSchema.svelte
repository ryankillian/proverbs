<script lang="ts">
	import type { GraphSchema } from '$lib/types';
	import StructuredDataSchema from '../StructuredDataSchema.svelte';

	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}/about`;

	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${domain}/#organization`,
				name: 'TilleyProverbs.com',
				url: domain,
				logo: {
					'@type': 'ImageObject',
					url: `${domain}/images/og/tilley.webp`,
					width: 1200,
					height: 630
				}
			},
			{
				'@type': ['WebPage', 'AboutPage'],
				'@id': pageUrl,
				url: pageUrl,
				name: 'About TilleyProverbs.com',
				description:
					"Learn about the purpose, source material, and technology behind the Tilley's Proverbs project.",
				inLanguage: 'en',
				isPartOf: { '@id': `${domain}/#website` },
				breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
				mainEntity: { '@id': `${domain}/#organization` }
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
						name: 'About',
						item: pageUrl
					}
				]
			}
		]
	};
</script>

<StructuredDataSchema {schema} />
