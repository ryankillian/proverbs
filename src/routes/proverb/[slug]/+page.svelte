<script lang="ts">
	export let data;

	let { content, metadata, imageSrcs } = data;
</script>

<article>
	<header>
		<h2>{metadata.proverb_text}</h2>
	</header>
	<section>
		{#each imageSrcs as imageSrc}
			<enhanced:img src={imageSrc} alt={metadata.proverb_text} />
		{/each}
		<svelte:component this={content} />
	</section>
</article>

<!-- <script lang="ts">
	import ProverbDetails from '$lib/components/ProverbDetails.svelte';
	export let data;

	let { content, metadata, imagePath, proverbData } = data;
	let imageSrc = '';

	const imageModules = import.meta.glob('../../../lib/images/*.png', {
		eager: true,
		query: {
			enhanced: true
		}
	});

	// async function loadImage() {
	// 	const module = await import(imagePath + '?enhanced');
	// 	imageSrc = module.default;
	// }

	// loadImage();

	// console.log('imageSrc', imageSrc);
</script> -->

<!-- <script lang="ts">
	const imageModules = import.meta.glob(
		'../../../lib/images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

	export let data;
	let { content, metadata } = data;
</script>

 {#each Object.entries(imageModules) as [_path, module]}
	{#if _path.includes(metadata.proverb_id)}
		<enhanced:img src={module.default} alt="some alt text" />
	{/if}
{/each} 

{#each Object.entries(imageModules) as [_path, module]}
	{#if _path.includes(metadata.proverb_id)}
		<enhanced:img src={module.default} alt="some alt text" />
	{/if}
{/each} -->

<!-- <enhanced:img src={image.default} alt="An alt text" /> -->
<!-- <enhanced:img src="`../image/B536.png`" alt="An alt text" /> -->
<!-- <enhanced:img src="../../../lib/images/B536.png" alt="An alt text" /> -->
<!-- <enhanced:img src={image} alt="An alt text" /> -->
<!-- <img src="./B536.png" alt="An alt text" /> -->
<!-- {#if image}
	<p>{image}</p>
	<img src={image} alt="An alt text" />
{/if} -->

<!-- <article>
	<header>
		<h2>{metadata.proverb_text}</h2>
	</header>
	<section>
		<svelte:component this={content} />
	</section>
</article> -->
