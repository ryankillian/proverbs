import { error } from '@sveltejs/kit';
import { getProverb, getNeighbours, getTopSimilar, getAnalysesForId } from '$lib/server';
import imageDimensionsJson from '$lib/server/image_dimensions.json';
import canonicalMapJson from '$lib/server/canonical_map.json';

type ImageDimensionsMap = Record<string, { width: number; height: number }>;
const imageDimensions: ImageDimensionsMap = imageDimensionsJson;

type CanonicalMap = Record<string, string>;
const canonicalMap: CanonicalMap = canonicalMapJson;

export const csr = false;

export function load({ params, url }) {
	const proverb = getProverb(params.id);
	const requestedId = params.id.toUpperCase();

	if (!proverb) throw error(404, 'Proverb not found');

	const { prev, next } = getNeighbours(proverb.proverb_id);
	const similarProverbs = getTopSimilar(params.id);
	const analyses = getAnalysesForId(proverb.proverb_id);

	const validXrefs = new Set(
		proverb.xref_items
			?.map((xref) => xref.proverb_id)
			.filter((id): id is string => !!(id && getProverb(id)))
	);

	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;
	const letter = proverb.proverb_id[0].toUpperCase();
	const imgPath = `${domain}/images/proverbs/${proverb.proverb_id[0]}/${proverb.proverb_id}_1.webp`;

	const masterId = canonicalMap[requestedId];
	const canonicalUrl = masterId ? `${domain}/proverbs/${masterId}` : pageUrl;

	const description = `${proverb.proverb_text} - Explore its meaning, analysis, historical context, and similar proverbs from Tilley's Dictionary.`;

	const seo = {
		title: proverb.proverb_text,
		description: description,
		imageUrl: imgPath,
		canonicalUrl: canonicalUrl
	};

	// --- Data for Breadcrumb Schema ---
	const breadcrumb = [
		{ name: 'Home', item: `${domain}/` },
		{ name: `Letter ${letter}`, item: `${domain}/letters/${letter.toUpperCase()}` },
		{ name: proverb.proverb_id, item: pageUrl }
	];

	const imagePathKey = `proverbs/${proverb.proverb_id[0]}/${proverb.proverb_id}_1.webp`;
	const dims1 = imageDimensions[
		`proverbs/${proverb.proverb_id[0]}/${proverb.proverb_id}_1.webp`
	] || { width: 1200, height: 630 };
	const dims2 = imageDimensions[`proverbs/${proverb.proverb_id[0]}/${proverb.proverb_id}_2.webp`];

	return {
		proverb,
		prev,
		next,
		image_count: proverb.image_count ?? 1,
		validXrefs,
		similarProverbs,
		seo,
		analyses: analyses || null,
		breadcrumb,
		pageUrl,
		dims1,
		dims2
	};
}
