import { getAllSummaries } from '$lib/server/index';

export const csr = true;

export const load = ({ url }) => {
	const allProverbs = getAllSummaries();
	const totalCount = allProverbs.length;

	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;

	const seo = {
		title: `Search ${totalCount.toLocaleString()} Proverbs`,
		description: `Search the full text of ${totalCount.toLocaleString()} proverbs from Tilley's Dictionary. Results appear instantly as you type.`,
		imageUrl: `${domain}/images/og/T534-search-not-too-curiously.webp`,
		ogType: 'website',
		canonicalUrl: pageUrl
	};

	return {
		allProverbs,
		seo,
		pageUrl: `${domain}${url.pathname}`
	};
};
