import { getSummariesByLetter } from '$lib/server';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	return letters.map((id) => ({ id }));
};

export const load: PageServerLoad = ({ params, url }) => {
	const letter = params.id;
	const proverbs = getSummariesByLetter(letter);

	const count = proverbs.length;
	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;
	const breadcrumb = [
		{ name: 'Home', item: `${domain}/` },
		{ name: 'Letters', item: `${domain}/` },
		{ name: `Letter ${letter}`, item: pageUrl }
	];
	const seo = {
		title: `Proverbs Starting with “${letter}” – ${count.toLocaleString()} Entries`,
		description: `Explore all ${count.toLocaleString()} historical English proverbs that begin with the letter ${letter}. Fully searchable citations from Tilley’s 16th–17th-century dictionary.`,
		imageUrl: `${domain}/images/og/B92-barnaby-bright.webp`,
		canonicalUrl: pageUrl
	};

	return {
		letter,
		proverbs,
		seo,
		pageUrl,
		breadcrumb,
		count
	};
};
