import { getKeywordIndex } from '$lib/server/index';

export const load = ({ url }) => {
	const keywords = getKeywordIndex();

	const total = keywords.length;
	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;
	const seo = {
		title: `Proverbs by Keyword – ${total.toLocaleString()} Topics`,
		description: `Browse ${total.toLocaleString()} keyword topics and discover historical English proverbs grouped by subject, ordered by frequency in Tilley’s Dictionary.`,
		imageUrl: `${domain}/images/og/P495-the-earthen-pot.webp`,
		canonicalUrl: pageUrl
	};

	return {
		keywords,
		seo
	};
};
