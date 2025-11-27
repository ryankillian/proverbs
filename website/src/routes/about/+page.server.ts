import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;
	const seo = {
		title: 'About TilleyProverbs.com',
		socialTitle: "About the Tilley's Proverbs Project",
		description:
			"Learn about the purpose, source material, and technology behind the Tilley's Proverbs project.",
		imageUrl: `${domain}/images/og/tilley.webp`,
		ogType: 'website',
		canonicalUrl: pageUrl
	};

	return {
		seo
	};
};
