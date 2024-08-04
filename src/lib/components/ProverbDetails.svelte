<!-- <script lang="ts">
	export let proverb;
</script>

<div>
	<p><strong>ID:</strong> {proverb.proverb_id}</p>
	<p><strong>Text:</strong> {proverb.proverb_text}</p>
	{#if proverb.explanation}
		<p><strong>Explanation:</strong> {proverb.explanation}</p>
	{/if}
	<h3>References:</h3>
	<ul>
		{#each proverb.references as reference}
			<li>
				{#if reference.year}<p><strong>Year:</strong> {reference.year}</p>{/if}
				{#if reference.author}<p><strong>Author:</strong> {reference.author}</p>{/if}
				<p><strong>Work:</strong> {reference.work}</p>
				{#if reference.location}<p><strong>Location:</strong> {reference.location}</p>{/if}
				<p><strong>Text:</strong> {reference.text}</p>
			</li>
		{/each}
	</ul>
</div> -->

<script lang="ts">
	export let proverb;
</script>

<div>
	<h2>{proverb.proverb_id} {proverb.proverb_text}</h2>

	{#if proverb.references.length > 0}
		<h3>References:</h3>
		<ul>
			{#each proverb.references as reference}
				<li>
					<blockquote>
						<p>{reference.text}</p>
						{#if reference.author || reference.year || reference.work || reference.location}
							<cite>
								{#if reference.author}{reference.author}—{/if}
								{#if reference.year}{reference.year}
								{/if}
								{reference.work}
								{#if reference.location}, {reference.location}{/if}
							</cite>
						{/if}
					</blockquote>
				</li>
			{/each}
		</ul>
	{/if}

	{#if proverb.similar_proverbs && proverb.similar_proverbs.length > 0}
		<h3>Similar Proverbs:</h3>
		<ul>
			{#each proverb.similar_proverbs as similar}
				<li>{similar.number}: {similar.text}</li>
			{/each}
		</ul>
	{/if}
</div>
