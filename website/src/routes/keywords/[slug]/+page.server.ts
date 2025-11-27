import { getKeywordIndex, getSummariesByKeywordSlug } from '$lib/server/index';
import { error } from '@sveltejs/kit';

const domain = 'https://tilleyproverbs.com';

// 1. Define the map for your custom keyword OG images.
// The keys should be the URL slugs (e.g., 'love', 'cat', 'dog').
const customOgImages: Record<string, string> = {
	love: `${domain}/images/og/L478-the-first-love.webp`,
	cat: `${domain}/images/og/C145-a-gloved-cat.webp`,
	dog: `${domain}/images/og/D466-every-naughty-dog.webp`,
	money: `${domain}/images/og/M1048-his-money-burns.webp`,
	fool: `${domain}/images/og/F445-as-the-fool-thinks.webp`,
	man: `${domain}/images/og/M293-a-man-of-many-trades.webp`,
	devil: `${domain}/images/og/D314-the-devils-mouth.webp`,
	men: `${domain}/images/og/M571-old-men.webp`,
	god: `${domain}/images/og/G196-god-is-a-potter.webp`,
	woman: `${domain}/images/og/W679-a-womans-work.webp`,
	women: `${domain}/images/og/W697-women-are-ambitious.webp`
};

export const entries = () => {
	const keywordIndex = getKeywordIndex();
	return keywordIndex.map((item) => ({ slug: item.slug }));
};

export const load = ({ params, url }) => {
	const slug = params.slug;
	const proverbs = getSummariesByKeywordSlug(slug);
	const keywordIndex = getKeywordIndex();
	const keywordInfo = keywordIndex.find((k) => k.slug === slug);

	if (!keywordInfo) {
		throw error(404, 'Keyword not found');
	}
	const keywordName = keywordInfo.name;
	const count = proverbs.length;

	// --- 2. DYNAMIC IMAGE URL LOGIC ---
	let imageUrl = customOgImages[slug]; // a. Try for a custom image using the slug

	if (!imageUrl && proverbs.length > 0) {
		// b. If no custom image, use the first proverb's image as a fallback
		const firstProverbId = proverbs[0].proverb_id;
		imageUrl = `${domain}/images/proverbs/${firstProverbId[0].toUpperCase()}/${firstProverbId}_1.webp`;
	}

	if (!imageUrl) {
		// c. Ultimate fallback to the generic site image
		imageUrl = `${domain}/images/og/tilley.webp`;
	}

	const title = `${count.toLocaleString()} Proverbs on the theme of ${keywordName}`;
	const pageUrl = `${domain}${url.pathname}`;
	const seo = {
		title: title,
		socialTitle: title,
		description: `Explore ${count.toLocaleString()} historical English proverbs that feature the theme of ${keywordName}, sourced from Tilley’s 16th–17th-century dictionary.`,
		imageUrl: imageUrl,
		canonicalUrl: pageUrl
	};

	const breadcrumb = [
		{ name: 'Home', item: `${domain}/` },
		{ name: 'Keywords', item: `${domain}/keywords` },
		{ name: keywordName, item: pageUrl }
	];

	return {
		keyword: keywordName,
		proverbs,
		seo,
		breadcrumb,
		pageUrl,
		count
	};
};
