// segmented sitemap

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// --- Configuration ---
const SITE_URL = 'https://tilleyproverbs.com';
const PROVERBS_PATH = './src/lib/data/proverbs.json';
const OUTPUT_DIR = './static/sitemaps';

// --- Helper Functions ---
const createUrlEntry = (loc, changefreq, priority, lastmod) => ({
	loc,
	changefreq,
	priority,
	lastmod
});

const slugify = (text) =>
	text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-');

const generateUrlsetXml = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
		.map(
			(url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
		)
		.join('')}
</urlset>`;

const generateSitemapIndexXml = (sitemapLocations) => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapLocations
		.map(
			(loc) => `
  <sitemap>
    <loc>${loc}</loc>
  </sitemap>`
		)
		.join('')}
</sitemapindex>`;

const main = () => {
	console.log('Generating structured sitemaps...');

	// --- 1. Load and Prepare Data ---
	if (!existsSync(PROVERBS_PATH)) {
		console.error(`Error: Proverbs data not found at ${PROVERBS_PATH}`);
		process.exit(1);
	}
	const proverbs = JSON.parse(readFileSync(PROVERBS_PATH, 'utf-8'));
	mkdirSync(OUTPUT_DIR, { recursive: true });
	const today = new Date().toISOString().split('T')[0];
	const sitemapLocations = [];

	// --- 2. Generate Core Pages Sitemap ---
	const corePages = [
		createUrlEntry(`${SITE_URL}/`, 'yearly', '1.0', today),
		createUrlEntry(`${SITE_URL}/about`, 'yearly', '0.5', today),
		createUrlEntry(`${SITE_URL}/search`, 'yearly', '0.9', today),
		createUrlEntry(`${SITE_URL}/keywords`, 'yearly', '0.9', today),
		createUrlEntry(`${SITE_URL}/contact`, 'yearly', '0.5', today)
	];
	writeFileSync(`${OUTPUT_DIR}/pages.xml`, generateUrlsetXml(corePages));
	sitemapLocations.push(`${SITE_URL}/sitemaps/pages.xml`);
	console.log(`✓ Generated pages.xml with ${corePages.length} URLs.`);

	// --- 3. Generate Letter-Based Sitemaps ---
	const proverbsByLetter = proverbs.reduce((acc, p) => {
		const letter = p.proverb_id[0].toUpperCase();
		if (!acc[letter]) acc[letter] = [];
		acc[letter].push(p);
		return acc;
	}, {});

	for (const letter in proverbsByLetter) {
		const urls = proverbsByLetter[letter].map((p) =>
			createUrlEntry(`${SITE_URL}/proverbs/${p.proverb_id}`, 'yearly', '0.9', today)
		);
		writeFileSync(`${OUTPUT_DIR}/proverbs-${letter.toLowerCase()}.xml`, generateUrlsetXml(urls));
		sitemapLocations.push(`${SITE_URL}/sitemaps/proverbs-${letter.toLowerCase()}.xml`);
	}
	console.log(`✓ Generated ${Object.keys(proverbsByLetter).length} letter-based sitemaps.`);

	// --- 4. Generate Collection-Based Sitemaps ---
	const collections = [
		'shakespeare',
		'bible',
		'erasmus',
		'dryden',
		'spenser',
		'milton',
		'chapman',
		'marlowe',
		'massinger',
		'dekker',
		'jonson',
		'beaumont-fletcher',
		'greene',
		'middleton',
		'lyly',
		'swift',
		'franklin',
		'don-quixote',
		'british-proverbs',
		'english-proverbs',
		'french-proverbs',
		'italian-proverbs',
		'spanish-proverbs',
		'lestrange',
		'sidney',
		'hobbes'
	];

	// This part is more complex as the filter logic is in SvelteKit. For simplicity,
	// we'll just create sitemaps for the collection pages themselves for now.
	const collectionUrls = collections.map((slug) =>
		createUrlEntry(`${SITE_URL}/collections/${slug}`, 'yearly', '0.8', today)
	);
	writeFileSync(`${OUTPUT_DIR}/collections.xml`, generateUrlsetXml(collectionUrls));
	sitemapLocations.push(`${SITE_URL}/sitemaps/collections.xml`);
	console.log(`✓ Generated collections.xml with ${collectionUrls.length} URLs.`);

	// --- 5. Generate Keyword-Based Sitemaps (for important keywords) ---
	const proverbsByKeyword = proverbs.reduce((acc, p) => {
		if (p.proverb_keyword) {
			const keyword = p.proverb_keyword;
			if (!acc[keyword]) acc[keyword] = [];
			acc[keyword].push(p);
		}
		return acc;
	}, {});

	const importantKeywords = Object.entries(proverbsByKeyword)
		.filter(([, proverbs]) => proverbs.length >= 50)
		.map(([keyword]) => keyword);

	for (const keyword of importantKeywords) {
		const slug = slugify(keyword);
		const urls = proverbsByKeyword[keyword].map((p) =>
			createUrlEntry(`${SITE_URL}/proverbs/${p.proverb_id}`, 'yearly', '0.7', today)
		);
		writeFileSync(`${OUTPUT_DIR}/keywords-${slug}.xml`, generateUrlsetXml(urls));
		sitemapLocations.push(`${SITE_URL}/sitemaps/keywords-${slug}.xml`);
	}
	console.log(`✓ Generated ${importantKeywords.length} important keyword sitemaps.`);

	// --- 6. Generate the Sitemap Index File ---
	const sitemapIndexXml = generateSitemapIndexXml(sitemapLocations);
	writeFileSync('static/sitemap.xml', sitemapIndexXml);
	console.log(
		`\n✓ Generated main sitemap.xml index pointing to ${sitemapLocations.length} sitemaps.`
	);

	const generateProverbsTxt = (proverbs) => {
		console.log('Generating proverbs.txt...');
		const content = proverbs
			.map((p) => `https://tilleyproverbs.com/proverbs/${p.proverb_id} ${p.proverb_text}`)
			.join('\n');

		// Write the file to the static directory
		writeFileSync('static/proverbs.txt', content);
		console.log(`✓ Generated proverbs.txt with ${proverbs.length} entries.`);
	};

	// Call the new function
	generateProverbsTxt(proverbs);
};

main();
