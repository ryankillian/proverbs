// og images

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

// --- Configuration ---
const SITE_URL = 'https://tilleyproverbs.com';
const PROVERBS_PATH = './src/lib/data/proverbs.json';
const OUTPUT_DIR = './static/sitemaps'; // All individual sitemaps go here
const INDEX_OUTPUT_PATH = './static/sitemap-images.xml'; // The main index file

// --- Helper Functions ---

const escapeXml = (unsafe) => {
	if (typeof unsafe !== 'string') return '';

	return unsafe.replace(/[<>&"']/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case '"':
				return '&quot;';
			case "'":
				return '&apos;';
		}
	});
};

const generateImageSitemapXml = (imageUrls) => {
	const urlEntries = imageUrls
		.map(
			(url) => `
  <url>
    <loc>${url.pageLoc}</loc>
    <image:image>
      <image:loc>${url.imageLoc}</image:loc>
      <image:caption>${url.caption}</image:caption>
      <image:title>${url.title}</image:title>
      <image:license>${url.license}</image:license>
    </image:image>
  </url>`
		)
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urlEntries}
</urlset>`;
};

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

// --- Main Execution ---
const generateImageSitemaps = () => {
	console.log('Generating segmented image sitemaps...');

	if (!existsSync(PROVERBS_PATH)) {
		console.error(`Error: Proverbs data not found at ${PROVERBS_PATH}`);
		process.exit(1);
	}
	const proverbs = JSON.parse(readFileSync(PROVERBS_PATH, 'utf-8'));
	mkdirSync(OUTPUT_DIR, { recursive: true });

	const imageSitemapLocations = [];
	const LICENSE_URL = 'https://creativecommons.org/licenses/by-nc/3.0/';

	const ogImagePages = [
		{ pagePath: '/', imageFile: 'tilley.webp', title: "Tilley's Proverbs Homepage" },
		{
			pagePath: '/collections/shakespeare',
			imageFile: 'W61-all-his-wardrobe.webp',
			title: 'Proverbs from Shakespeare'
		},
		{
			pagePath: '/collections/bible',
			imageFile: 'P495-the-earthen-pot.webp',
			title: 'Proverbs from The Bible'
		},
		{
			pagePath: '/collections/don-quixote',
			imageFile: 'B360-bird-in-hand.webp',
			title: 'Proverbs from Don Quixote'
		},
		{
			pagePath: '/collections/italian-proverbs',
			imageFile: 'B273-a-bell-is-known.webp',
			title: 'Proverbs from Italy'
		},
		{
			pagePath: '/collections/french-proverbs',
			imageFile: 'F649-the-sleepy-fox.webp',
			title: 'Proverbs from France'
		},
		{
			pagePath: '/collections/spanish-proverbs',
			imageFile: 'B92-barnaby-bright.webp',
			title: 'Proverbs from Spain'
		},
		{
			pagePath: '/collections/english-proverbs',
			imageFile: 'C152-let-the-cat-wink.webp',
			title: 'Proverbs from England'
		},
		{
			pagePath: '/collections/franklin',
			imageFile: 'G106-gifts-break-through-rocks.webp',
			title: 'Proverbs from Benjamin Franklin'
		},
		{
			pagePath: '/keywords/love',
			imageFile: 'L478-the-first-love.webp',
			title: 'Proverbs about Love'
		},
		{
			pagePath: '/keywords/cat',
			imageFile: 'C145-a-gloved-cat.webp',
			title: 'Proverbs about Cats'
		},
		{
			pagePath: '/keywords/dog',
			imageFile: 'D466-every-naughty-dog.webp',
			title: 'Proverbs about Dogs'
		},
		{
			pagePath: '/keywords/money',
			imageFile: 'M1048-his-money-burns.webp',
			title: 'Proverbs about Money'
		},
		{
			pagePath: '/keywords/fools',
			imageFile: 'F445-as-the-fool-thinks.webp',
			title: 'Proverbs about Fools'
		},
		{
			pagePath: '/keywords/man',
			imageFile: 'M293-a-man-of-many-trades.webp',
			title: 'Proverbs about a Man'
		},
		{
			pagePath: '/keywords/devil',
			imageFile: 'D314-the-devils-mouth.webp',
			title: 'Proverbs about the Devil'
		},
		{
			pagePath: '/keywords/men',
			imageFile: 'M571-old-men.webp',
			title: 'Proverbs about Men'
		},
		{
			pagePath: '/keywords/god',
			imageFile: 'G196-god-is-a-potter.webp',
			title: 'Proverbs about God'
		},
		{
			pagePath: '/keywords/woman',
			imageFile: 'W679-a-womans-work.webp',
			title: 'Proverbs about a Woman'
		},
		{
			pagePath: '/keywords/women',
			imageFile: 'W697-women-are-ambitious.webp',
			title: 'Proverbs about Women'
		}
	];

	const ogImageUrls = ogImagePages.map((page) => ({
		pageLoc: `${SITE_URL}${page.pagePath}`,
		imageLoc: `${SITE_URL}/images/og/${page.imageFile}`,
		caption: `A promotional image for the page: ${page.title}`,
		title: page.title,
		license: LICENSE_URL
	}));

	const ogImageSitemapXml = generateImageSitemapXml(ogImageUrls);
	const ogSitemapFilename = 'images-og.xml';
	writeFileSync(`${OUTPUT_DIR}/${ogSitemapFilename}`, ogImageSitemapXml);
	imageSitemapLocations.push(`${SITE_URL}/sitemaps/${ogSitemapFilename}`);
	console.log(`✓ Generated ${ogSitemapFilename} with ${ogImageUrls.length} OG images.`);

	const proverbsByLetter = proverbs.reduce((acc, p) => {
		const letter = p.proverb_id[0]?.toUpperCase();
		if (letter) {
			if (!acc[letter]) acc[letter] = [];
			acc[letter].push(p);
		}
		return acc;
	}, {});

	for (const letter in proverbsByLetter) {
		const imageUrls = [];
		for (const proverb of proverbsByLetter[letter]) {
			const pageLoc = `${SITE_URL}/proverbs/${proverb.proverb_id}`;
			const proverbTextEscaped = escapeXml(proverb.proverb_text);
			const imageTitle = proverbTextEscaped;
			const imageCaption = `A scan of the entry for the proverb "${proverbTextEscaped}" from Morris P. Tilley's historical dictionary.`;

			imageUrls.push({
				pageLoc,
				imageLoc: `${SITE_URL}/images/proverbs/${letter}/${proverb.proverb_id}_1.webp`,
				caption: imageCaption,
				title: imageTitle,
				license: LICENSE_URL
			});

			if (proverb.image_count > 1) {
				imageUrls.push({
					pageLoc,
					imageLoc: `${SITE_URL}/images/proverbs/${letter}/${proverb.proverb_id}_2.webp`,
					caption: `${imageCaption} (continuation)`,
					title: `${imageTitle} (continuation)`,
					license: LICENSE_URL
				});
			}
		}

		const imageSitemapXml = generateImageSitemapXml(imageUrls);
		const sitemapFilename = `images-${letter.toLowerCase()}.xml`;
		writeFileSync(`${OUTPUT_DIR}/${sitemapFilename}`, imageSitemapXml);
		imageSitemapLocations.push(`${SITE_URL}/sitemaps/${sitemapFilename}`);
	}

	console.log(`✓ Generated ${Object.keys(proverbsByLetter).length} letter-based image sitemaps.`);

	const imageSitemapIndexXml = generateSitemapIndexXml(imageSitemapLocations);
	writeFileSync(INDEX_OUTPUT_PATH, imageSitemapIndexXml);
	console.log(
		`✓ Generated sitemap_images.xml index pointing to ${imageSitemapLocations.length} sitemaps.`
	);
};

generateImageSitemaps();
