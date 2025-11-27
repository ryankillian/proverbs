import { getAllIds } from '$lib/server';
import { json } from '@sveltejs/kit';

export const prerender = true;

export function GET() {
	const ids = getAllIds();
	return json(ids);
}
