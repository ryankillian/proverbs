const ROMAN_MAP: { [key: string]: number } = {
	M: 1000,
	CM: 900,
	D: 500,
	CD: 400,
	C: 100,
	XC: 90,
	L: 50,
	XL: 40,
	X: 10,
	IX: 9,
	V: 5,
	IV: 4,
	I: 1
};

function romanToInt(s: string): number {
	if (!s || typeof s !== 'string') return 0;
	let i = 0;
	let num = 0;
	const str = s.toUpperCase();
	while (i < str.length) {
		if (i + 1 < str.length && ROMAN_MAP[str.substring(i, i + 2)]) {
			num += ROMAN_MAP[str.substring(i, i + 2)];
			i += 2;
		} else {
			num += ROMAN_MAP[str.substring(i, i + 1)] || 0;
			i += 1;
		}
	}
	return num;
}

/**
 * Converts a citation part (act, scene, chapter, verse) into a padded number for sorting.
 * Handles Roman numerals, Arabic numerals, and OCR errors gracefully.
 */
function getSortablePart(part: string | null | undefined): string {
	if (!part) return '0000'; // Default for missing parts

	// Check if it's a Roman numeral (common for acts/scenes)
	// A simple check: if it contains I, V, or X and no digits.
	if (/[IVXLC]/i.test(part) && !/\d/.test(part)) {
		const num = romanToInt(part);
		return String(num).padStart(4, '0');
	}

	// It's likely an Arabic numeral, possibly with OCR noise.
	// Extract the first sequence of digits we can find.
	const match = part.match(/\d+/);
	const num = match ? parseInt(match[0], 10) : 0;

	return String(num).padStart(4, '0');
}

/**
 * The main sorting comparator function for citations.
 * Creates a comparable string like "00040007" for Act IV, Scene vii.
 */
export function compareCitations(a: any, b: any, type: 'shakespeare' | 'bible'): number {
	if (type === 'shakespeare') {
		const a_act = getSortablePart(a.citation.act);
		const a_scene = getSortablePart(a.citation.scene);
		const b_act = getSortablePart(b.citation.act);
		const b_scene = getSortablePart(b.citation.scene);
		return `${a_act}${a_scene}`.localeCompare(`${b_act}${b_scene}`);
	}

	if (type === 'bible') {
		const a_chapter = getSortablePart(a.citation.chapter);
		const a_verse = getSortablePart(a.citation.verse);
		const b_chapter = getSortablePart(b.citation.chapter);
		const b_verse = getSortablePart(b.citation.verse);
		return `${a_chapter}${a_verse}`.localeCompare(`${b_chapter}${b_verse}`);
	}

	return 0;
}
