export const load = async () => {
	const proverbModules = import.meta.glob('../../lib/proverbs/*.md');

	const proverbSlugs = await Promise.all(
		Object.entries(proverbModules).map(async ([path, _]) => {
			const slug = path.split('/').pop()!.slice(0, -3);
			return slug;
		})
	);

	const slug = proverbSlugs[Math.floor(Math.random() * proverbSlugs.length)];

	return {
		slug
	};
};
