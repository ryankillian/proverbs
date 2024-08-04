import type { SvelteComponent } from 'svelte';

export interface Metadata {
	proverb_id: string;
	proverb_text: string;
	image: string;
	ocr: string;
	analysis: string;
}

export interface Proverb {
	metadata: Metadata;
	default: typeof SvelteComponent;
}

// export interface FableData {
// 	metadata: Metadata;
// 	slug: string;
// }

export interface Reference {
	year?: string | null;
	author?: string | null;
	work: string;
	location?: string | null;
	text: string;
}

export interface SimilarProverb {
	number: string;
	text: string;
}

export interface ProverbData {
	proverb_id: string;
	proverb_text: string;
	explanation?: string | null;
	references: Reference[];
	similar_proverbs?: SimilarProverb[];
}
