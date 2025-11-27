import { getAllSummaries } from '$lib/server';

export const load = ({ url }) => {
	const summaries = getAllSummaries();
	const letterCounts = new Map<string, number>();

	for (const summary of summaries) {
		const firstLetter = summary.proverb_id[0];
		letterCounts.set(firstLetter, (letterCounts.get(firstLetter) || 0) + 1);
	}

	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => ({
		letter,
		count: letterCounts.get(letter) || 0
	}));

	// --- Data for Structured Data Schema ---
	const lettersForSchema = [
		{ name: 'Letter A', url: '/letters/A' },
		{ name: 'Letter B', url: '/letters/B' },
		{ name: 'Letter C', url: '/letters/C' }
	];

	const collectionsForSchema = [
		{ name: 'Shakespeare', url: '/collections/shakespeare' },
		{ name: 'The Bible', url: '/collections/bible' },
		{ name: 'Erasmus', url: '/collections/erasmus' }
	];

	const total = summaries.length.toLocaleString();
	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}/`;
	const seo = {
		title: `${total} Proverbs from Shakespeare & Others`,
		// title: `${total} Proverbs from Shakespeare, the Bible and More`,
		description: `Browse ${total} historical proverbs from Shakespeare, the Bible, and more, based on Tilley's Dictionary. Each entry is enhanced with modern analysis and similar proverbs.`,
		imageUrl: `${domain}/images/og/C635-every-cook.webp`,
		ogType: 'website',
		canonicalUrl: pageUrl
	};

	return {
		letters,
		lettersForSchema,
		collectionsForSchema,
		totalProverbCount: summaries.length,
		seo
	};
};
