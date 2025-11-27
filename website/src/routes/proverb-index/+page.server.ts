// import { getAllSummaries } from '$lib/server/index';

// export const load = ({ url }) => {
// 	const allSummaries = getAllSummaries();

// 	// Group proverbs by the first letter of their ID
// 	const proverbsByLetter = new Map<string, any[]>();
// 	for (const summary of allSummaries) {
// 		const firstLetter = summary.proverb_id[0].toUpperCase();
// 		if (!proverbsByLetter.has(firstLetter)) {
// 			proverbsByLetter.set(firstLetter, []);
// 		}
// 		proverbsByLetter.get(firstLetter)?.push(summary);
// 	}

// 	// Convert the Map to a sorted array for easier rendering
// 	const letterGroups = Array.from(proverbsByLetter.entries())
// 		.map(([letter, proverbs]) => ({ letter, proverbs }))
// 		.sort((a, b) => a.letter.localeCompare(b.letter));

// 	const availableLetters = letterGroups.map((group) => group.letter);

// 	const domain = 'https://tilleyproverbs.com';
// 	const seo = {
// 		title: `Complete Index of ${allSummaries.length.toLocaleString()} English Proverbs`,
// 		description: `Browse a single-page index of ${allSummaries.length.toLocaleString()} historical English proverbs from Tilley’s Dictionary, including sources such as Shakespeare, the Bible and Don Quixote.`,
// 		imageUrl: `${domain}/images/og/C152-let-the-cat-wink.webp`
// 	};
// 	return {
// 		letterGroups,
// 		availableLetters,
// 		totalCount: allSummaries.length,
// 		seo,
// 		firstProverbs: allSummaries.slice(0, 5)
// 	};
// };

import { getAllSummaries } from '$lib/server/index';

export const load = ({ url }) => {
	const allProverbs = getAllSummaries();
	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;
	const seo = {
		title: `Complete Index of ${allProverbs.length.toLocaleString()} English Proverbs`,
		description: `Browse a single-page index of ${allProverbs.length.toLocaleString()} historical English proverbs from Tilley’s Dictionary, including sources such as Shakespeare, the Bible and Don Quixote.`,
		imageUrl: `${domain}/images/og/tilley.webp`,
		canonicalUrl: pageUrl
	};
	return {
		proverbs: allProverbs,
		seo
	};
};
