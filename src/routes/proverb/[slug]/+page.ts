import type { Proverb } from '$lib/types.js';

export const load = async ({ params, fetch }) => {
	const proverb: Proverb = await import(`../../../lib/proverbs/${params.slug}.md`);
	const metadata = proverb.metadata;
	const content = proverb.default;

	// TODO: Revist ProverbDetails JSON functionality
	// const ocrModules = import.meta.glob('../../../lib/ocr/*.json', {
	// 	eager: true
	// }) as Record<string, { default: any }>;

	// Dynamic images which work for production builds
	let imageSrcs: string[] = [];

	// Eagerly import all images
	const imageModules = import.meta.glob('../../../lib/images/*.png', {
		eager: true,
		query: {
			enhanced: true
		}
	}) as Record<string, { default: string }>;

	// First, try to find an image without a suffix
	let foundMainImage = false;
	for (const [_path, module] of Object.entries(imageModules)) {
		if (_path.includes(`${metadata.proverb_id}.png`)) {
			imageSrcs.push(module.default);
			foundMainImage = true;
			break;
		}
	}

	// If no main image found, check for 'a' and 'b' suffixes
	if (!foundMainImage) {
		for (const suffix of ['a', 'b']) {
			for (const [_path, module] of Object.entries(imageModules)) {
				if (_path.includes(`${metadata.proverb_id}${suffix}.png`)) {
					imageSrcs.push(module.default);
					break;
				}
			}
		}
	}

	return {
		metadata,
		content,
		imageSrcs
	};
};
