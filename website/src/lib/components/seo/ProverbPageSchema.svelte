<script lang="ts">
	import StructuredDataSchema from '$lib/components/StructuredDataSchema.svelte';
	import type { Proverb, ProverbSummary, AnalysisEntry, GraphSchema, SchemaNode } from '$lib/types';

	type BreadcrumbItem = { name: string; item: string };

	let {
		proverb,
		pageUrl,
		similarProverbs,
		analyses,
		breadcrumb,
		imageDimensions
	}: {
		proverb: Proverb;
		pageUrl: string;
		similarProverbs: ProverbSummary[];
		analyses: AnalysisEntry[] | null;
		breadcrumb: BreadcrumbItem[];
		imageDimensions: { width: number; height: number };
	} = $props();

	const firstAnalysis = analyses?.[0];
	const domain = 'https://tilleyproverbs.com';

	const graphNodes: SchemaNode[] = [
		{
			'@type': ['WebPage', 'ItemPage'],
			'@id': `${pageUrl}#webpage`,
			url: pageUrl,
			name: proverb.proverb_text,
			description: `Meaning, analysis, and historical context for the English proverb: ${proverb.proverb_text}`,
			inLanguage: 'en',
			breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
			primaryImageOfPage: { '@id': `${pageUrl}#scan` },
			mainEntity: { '@id': `${pageUrl}#term` }
		},
		{
			'@type': 'DefinedTerm',
			'@id': `${pageUrl}#term`,
			name: proverb.proverb_text,
			description: firstAnalysis?.analysis.literal_meaning || 'An early-modern English proverb.',
			inLanguage: 'en',
			citation: {
				'@type': 'Book',
				name: 'A Dictionary of the Proverbs in England in the Sixteenth and Seventeenth Centuries',
				author: { '@type': 'Person', name: 'Morris Palmer Tilley' },
				datePublished: '1950'
			},
			image: { '@id': `${pageUrl}#scan` },
			url: pageUrl
		},
		{
			'@type': 'ImageObject',
			'@id': `${pageUrl}#scan`,
			url: `${domain}/images/proverbs/${proverb.proverb_id[0]}/${proverb.proverb_id}_1.webp`,
			width: imageDimensions.width,
			height: imageDimensions.height,
			license: 'https://creativecommons.org/licenses/by-nc/3.0/',
			creator: { '@type': 'Organization', name: 'HathiTrust Digital Library' },
			copyrightNotice: '© 1950 University of Michigan Press',
			creditText: 'HathiTrust Digital Library',
			acquireLicensePage: 'https://creativecommons.org/licenses/by-nc/3.0/'
		},
		{
			'@type': 'BreadcrumbList',
			'@id': `${pageUrl}#breadcrumb`,
			itemListElement: breadcrumb.map((crumb, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: crumb.name,
				item: crumb.item // This is correct, `item` should be a URL string for BreadcrumbList
			}))
		}
	];

	if (firstAnalysis) {
		graphNodes.push({
			'@type': 'Article',
			'@id': `${pageUrl}#analysis`,
			headline: `Analysis of the proverb: ${proverb.proverb_text}`,
			about: { '@id': `${pageUrl}#term` },
			author: {
				'@type': 'Organization',
				name: 'TilleyProverbs.com (AI-assisted)',
				url: 'https://tilleyproverbs.com/'
			},
			image: { '@id': `${pageUrl}#scan` },
			datePublished: firstAnalysis.analysis_date,
			isPartOf: { '@id': `${pageUrl}#webpage` }
		});
	}

	if (similarProverbs && similarProverbs.length > 0) {
		graphNodes.push({
			'@type': 'ItemList',
			'@id': `${pageUrl}#similar`,
			name: 'Similar Proverbs',
			numberOfItems: 5,
			itemListOrder: 'Unordered',
			itemListElement: similarProverbs.slice(0, 5).map((p, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				item: {
					'@type': 'DefinedTerm',
					'@id': `${domain}/proverbs/${p.proverb_id}`,
					url: `${domain}/proverbs/${p.proverb_id}`,
					name: p.proverb_text
				}
			}))
		});
	}

	// This final schema object is now built from a correctly typed array
	const schema: GraphSchema = {
		'@context': 'https://schema.org',
		'@graph': graphNodes
	};
</script>

<StructuredDataSchema {schema} />
