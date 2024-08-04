import type { Proverb, ProverbData } from '$lib/types.js';
// import proverbData from '$lib/ocr/B536.json';

export const load = async ({ params, fetch }) => {
	const proverb: Proverb = await import(`../../../lib/proverbs/${params.slug}.md`);
	const metadata = proverb.metadata;
	const content = proverb.default;

	const ocrModules = import.meta.glob('../../../lib/ocr/*.json', {
		eager: true
	}) as Record<string, { default: any }>;

	let proverbData: ProverbData;
	for (const [_path, module] of Object.entries(ocrModules)) {
		if (_path.includes(metadata.proverb_id)) {
			proverbData = module.default;
			break;
		}
	}

	// Dynamic images which work for production builds
	let imageSrc = '';

	// Eagerly import all images
	const imageModules = import.meta.glob('../../../lib/images/*.png', {
		eager: true,
		query: {
			enhanced: true
		}
	}) as Record<string, { default: string }>;

	// Find the correct image based on proverb_id
	for (const [_path, module] of Object.entries(imageModules)) {
		if (_path.includes(metadata.proverb_id)) {
			imageSrc = module.default;
			break;
		}
	}

	return {
		metadata,
		content,
		proverbData,
		imageSrc
	};
};
