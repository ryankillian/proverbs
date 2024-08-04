import type { Metadata } from '$lib/types.js';

export const load = async () => {
	const modules = import.meta.glob('../lib/proverbs/*.md');

	const proverbs = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: Metadata };
			const slug = path.split('/').pop()!.slice(0, -3);

			return {
				slug,
				metadata
			};
		})
	);

	return {
		proverbs
	};
};
