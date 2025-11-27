import type { BibleBookTitle, ShakespeareWorkTitleAbbr } from '$lib/constants/book-abbreviations';

export interface ErasmusCitation {
	author: 'Erasmus';
	title?: string | null;
	reference_id?: string | null;
	text_quote?: string | null;
	raw_citation: string;
}

export interface BibleCitation {
	book_title?: BibleBookTitle | null;
	chapter?: string | null;
	verse?: string | null;
	text_quote?: string | null;
	raw_citation: string;
}

export interface ShakespeareCitation {
	author: 'Shakespeare';
	title_abbr?: ShakespeareWorkTitleAbbr | null;
	act?: string | null;
	scene?: string | null;
	line?: string | null;
	year_display?: string | null;
	text_quote: string;
	raw_citation: string;
}

export interface InitialBracketedDate {
	raw_bracketed_string: string;
	normalized_year_for_first_reference: string;
}

export interface Quotation {
	raw_quotation_line: string;
	year?: string | null;
	author?: string | null;
	title?: string | null;
	location?: string | null;
	text_quote?: string | null;
}

export interface ProverbCrossReference {
	raw_item_string: string;
	proverb_id?: string | null;
	proverb_text?: string | null;
	note_text?: string | null;
}

export interface Proverb {
	raw_header_string: string;
	proverb_id: string;
	proverb_keyword?: string | null;
	proverb_text: string;
	initial_bracketed_date_info?: InitialBracketedDate | null;
	explanation?: string | null;
	initial_bible_citation?: BibleCitation | null;
	initial_erasmus_citation?: ErasmusCitation | null;
	quotations_list?: Quotation[];
	shakespeare_citations?: ShakespeareCitation[] | null;
	xref_items?: ProverbCrossReference[] | null;
	annotations?: Annotation[];
	image_count: number;
}

export interface ProverbSummary {
	proverb_id: string;
	proverb_text: string;
}

export interface SimilarProverb {
	id: string;
	score: number; // The calculated cosine similarity score (e.g., 0.8123)
}

export interface SimilarProverbWithSummary extends SimilarProverb, ProverbSummary {}

export interface Annotation {
	marker: string;
	text: string;
}

interface ThemedDescription {
	theme: string;
	description: string;
}

export interface ProverbAnalysisContent {
	proverb_id: string;
	proverb_text: string;
	literal_meaning: string;
	metaphorical_meanings: ThemedDescription[];
	insights: ThemedDescription[];
	stylistic_features: {
		device: string;
		description: string;
	}[];
	tags: string[];
}

export interface TokenUsage {
	completion_tokens: number;
	prompt_tokens: number;
	total_tokens: number;
}

export interface AnalysisEntry {
	model_name: string;
	analysis_date: string; // Stored as an ISO string
	analysis: ProverbAnalysisContent;
	token_usage: TokenUsage | null;
}

export type SchemaNode = {
	'@type': string | string[];
	'@id'?: string;
	name?: string;
	url?: string;
	[key: string]: any; // This is the "index signature" that allows any other property
};

// Update GraphSchema to use this and be readonly
export interface GraphSchema {
	readonly '@context': 'https://schema.org';
	readonly '@graph': readonly SchemaNode[];
}
