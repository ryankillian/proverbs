/**
 * Converts a string into a URL-friendly "slug".
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes any non-alphanumeric characters (except hyphens)
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars except -
		.replace(/--+/g, '-'); // Replace multiple - with single -
}
