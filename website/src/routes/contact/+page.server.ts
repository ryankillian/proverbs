export const csr = true; // JS only on
export const prerender = true;

export const load = ({ url }) => {
	const domain = 'https://tilleyproverbs.com';
	const pageUrl = `${domain}${url.pathname}`;
	const seo = {
		title: `Contact Us`,
		description: `Send feedback, suggestions, or questions about the Compare Translations website.`,
		imageUrl: `${domain}/images/og/tilley.webp`,
		canonicalUrl: pageUrl
	};
	return {
		seo
	};
};
