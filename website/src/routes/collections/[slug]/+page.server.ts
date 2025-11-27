import { getSummariesByFilter, getGroupedCitations } from '$lib/server/index';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

// Use `entries` to tell SvelteKit which pages to build
export const entries: EntryGenerator = () => {
	return Object.keys(collections).map((slug) => ({ slug }));
};

const collections = {
	shakespeare: { type: 'shakespeare', name: 'William Shakespeare', grouped: true },
	bible: { type: 'bible', name: 'The Bible', grouped: true },
	erasmus: { type: 'erasmus', name: 'Erasmus', grouped: false },
	'don-quixote': {
		type: 'don_quixote',
		name: 'Don Quixote',
		grouped: false
	},
	'shelton-don-quixote': {
		type: 'shelton_don_quixote',
		name: "Shelton's Don Quixote",
		grouped: false
	},
	'british-proverbs': {
		type: 'british_proverbs',
		name: 'BritishProverbs',
		grouped: false
	},
	'english-proverbs': {
		type: 'english_proverbs',
		name: 'English Proverbs',
		grouped: false
	},
	'italian-proverbs': {
		type: 'italian_proverbs',
		name: 'Italian Proverbs',
		grouped: false
	},
	'spanish-proverbs': {
		type: 'spanish_proverbs',
		name: 'Spanish Proverbs',
		grouped: false
	},
	'french-proverbs': {
		type: 'french_proverbs',
		name: 'French Proverbs',
		grouped: false
	},
	franklin: {
		type: 'benjamin_franklin',
		name: 'Benjamin Franklin',
		grouped: false
	},
	milton: {
		type: 'john_milton',
		name: 'John Milton',
		grouped: false
	},
	dryden: {
		type: 'john_dryden',
		name: 'John Dryden',
		grouped: false
	},
	marlowe: {
		type: 'marlowe',
		name: 'Christopher Marlowe',
		grouped: false
	},
	swift: {
		type: 'swift',
		name: 'Jonathan Swift',
		grouped: false
	},
	chapman: {
		type: 'chapman',
		name: 'George Chapman',
		grouped: false
	},
	jonson: {
		type: 'jonson',
		name: 'Ben Jonson',
		grouped: false
	},
	'beaumont-fletcher': {
		type: 'beaumont_fletcher',
		name: 'Beaumont and Fletcher',
		grouped: false
	},
	dekker: {
		type: 'dekker',
		name: 'Thomas Dekker',
		grouped: false
	},
	massinger: {
		type: 'massinger',
		name: 'Philip Massinger',
		grouped: false
	},
	spenser: {
		type: 'spenser',
		name: 'Edmund Spenser',
		grouped: false
	},
	lyly: {
		type: 'lyly',
		name: 'John Lyly',
		grouped: false
	},
	middleton: {
		type: 'middleton',
		name: 'Thomas Middleton',
		grouped: false
	},
	greene: {
		type: 'greene',
		name: 'Robert Greene',
		grouped: false
	},
	hobbes: {
		type: 'hobbes',
		name: 'Thomas Hobbes',
		grouped: false
	},
	lestrange: {
		type: 'lestrange',
		name: "Roger L'Estrange",
		grouped: false
	},
	sidney: {
		type: 'sidney',
		name: 'Philip Sidney',
		grouped: false
	}
} as const;
type CollectionSlug = keyof typeof collections;

const domain = 'https://tilleyproverbs.com';

// We create a `Record` type. This tells TypeScript:
// "This is an object where the keys can be any `CollectionSlug`,
// and the values will be strings. Some keys might not be present."
const customOgImages: Partial<Record<CollectionSlug, string>> = {
	shakespeare: `${domain}/images/og/W61-all-his-wardrobe.webp`,
	bible: `${domain}/images/og/P495-the-earthen-pot.webp`,
	'italian-proverbs': `${domain}/images/og/B273-a-bell-is-known.webp`,
	'french-proverbs': `${domain}/images/og/F649-the-sleepy-fox.webp`,
	'spanish-proverbs': `${domain}/images/og/B92-barnaby-bright.webp`,
	'english-proverbs': `${domain}/images/og/C152-let-the-cat-wink.webp`,
	franklin: `${domain}/images/og/G106-gifts-break-through-rocks.webp`,
	'don-quixote': `${domain}/images/og/B360-bird-in-hand.webp`
};

const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

export const load = ({ params, url }) => {
	const slug = params.slug as CollectionSlug;
	const collection = collections[slug];
	if (!collection) throw error(404, 'Collection not found');

	let data;
	let proverbsForImageSelection: any[] = [];
	let count: number;
	let groupedAndSluggedData: any[] = [];

	if (collection.grouped) {
		const groups = getGroupedCitations(collection.type as 'shakespeare' | 'bible');
		groupedAndSluggedData = groups.map((group) => ({
			...group,
			slug: slugify(group.full_title)
		}));
		data = groupedAndSluggedData;
		count = new Set(groups.flatMap((g: any) => g.citations.map((c: any) => c.proverb_id))).size;
		// For the OG image, grab the very first proverb from the first group, if it exists
		if (groups.length > 0 && groups[0].citations.length > 0) {
			proverbsForImageSelection = [groups[0].citations[0]];
		}
	} else {
		data = getSummariesByFilter(collection.type, '');
		proverbsForImageSelection = data;
		count = data.length;
	}

	// --- DYNAMIC IMAGE URL LOGIC ---
	let imageUrl = customOgImages[slug]; // 1. Try for a custom image

	if (!imageUrl && proverbsForImageSelection.length > 0) {
		// 2. If no custom image, use the first proverb's image
		const firstProverbId = proverbsForImageSelection[0].proverb_id;
		imageUrl = `${domain}/images/proverbs/${firstProverbId[0].toUpperCase()}/${firstProverbId}_1.webp`;
	}

	if (!imageUrl) {
		// 3. Fallback to the generic site image
		imageUrl = `${domain}/images/og/tilley.webp`;
	}

	const title = collection.name.includes('Proverbs')
		? `${count.toLocaleString()} ${collection.name}`
		: `${count.toLocaleString()} Proverbs from ${collection.name}`;

	const pageUrl = `${domain}${url.pathname}`;
	const seo = {
		title: title,
		description: `Browse ${count.toLocaleString()} historical English proverbs cited in ${collection.name}, drawn from Tilley’s 16th–17th-century dictionary.`,
		imageUrl: imageUrl,
		socialTitle: `Proverbs from ${collection.name}`,
		canonicalUrl: pageUrl
	};

	// Prepare Breadcrumbs
	const breadcrumb = [
		{ name: 'Home', item: `${domain}/` },
		{ name: 'Collections', item: `${domain}/collections` },
		{ name: collection.name, item: pageUrl }
	];

	return {
		slug: slug,
		title: collection.name,
		grouped: collection.grouped,
		data,
		count,
		seo,
		pageUrl,
		breadcrumb
	};
};
