<script lang="ts">
	type Props = {
		proverbId: string;
		imageNum: 1 | 2;
		altText: string;
		width: number;
		height: number;
	};
	let { proverbId, imageNum, altText, width, height }: Props = $props();

	const firstLetter = proverbId[0];
</script>

<picture>
	<source
		media="(max-width: 767px)"
		srcset={`/images/proverbs_small/${firstLetter}/${proverbId}_${imageNum}.webp`}
	/>

	<source
		media="(min-width: 768px)"
		srcset={`/images/proverbs/${firstLetter}/${proverbId}_${imageNum}.webp`}
	/>

	<img
		src={`/images/proverbs/${firstLetter}/${proverbId}_${imageNum}.webp`}
		alt={altText}
		class="scan border shadow"
		loading="lazy"
		decoding="async"
		{width}
		{height}
	/>
</picture>
