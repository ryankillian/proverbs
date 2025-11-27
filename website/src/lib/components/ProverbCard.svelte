<script lang="ts">
	import type { Proverb, Quotation } from '$lib/types';

	interface Props {
		proverb: Proverb;
		validXrefs: Set<string>;
	}

	let { proverb, validXrefs }: Props = $props();

	const hasNext = (q: Quotation, keys: Array<keyof Quotation>) => keys.some((k) => !!q[k]);
</script>

<!-- The main container is now just a simple div. -->
<!-- All spacing between sections will be handled by the parent `prose` styles. -->
<div class="space-y-8 font-serif">
	{#if proverb.initial_bible_citation || proverb.initial_erasmus_citation || proverb.quotations_list?.length}
		<section>
			<div><h3 class="mt-0">Quotations</h3></div>

			{#if proverb.initial_erasmus_citation}
				{@const e = proverb.initial_erasmus_citation}

				<figure>
					<blockquote>
						<p>{e.text_quote ?? ''}</p>
					</blockquote>
					<figcaption>
						— {e.author ?? ''}, <cite>{e.title ?? ''}</cite>
						{e.reference_id ?? ''}
					</figcaption>
				</figure>
			{/if}

			<!-- QUOTATIONS LIST -->
			{#if proverb.quotations_list?.length}
				{#each proverb.quotations_list as q}
					<figure>
						{#if q.text_quote}
							<blockquote>
								<p>{q.text_quote}</p>
							</blockquote>
						{/if}
						<figcaption>
							—
							{#if q.year}
								<strong>{q.year}</strong>{#if hasNext(q, ['author', 'title', 'location'])},
								{/if}
							{/if}
							{#if q.author}
								{q.author}{#if hasNext(q, ['title', 'location'])},
								{/if}
							{/if}
							{#if q.title}
								<cite>{q.title}</cite>{#if hasNext(q, ['location'])},
								{/if}
							{/if}
							{#if q.location}
								{q.location}
							{/if}
						</figcaption>
					</figure>
				{/each}
			{/if}
		</section>
	{/if}
	<!-- <h2 class="mt-0">Quotations</h2> -->
	<!-- BIBLE CITATION -->
	{#if proverb.initial_bible_citation}
		{@const b = proverb.initial_bible_citation}
		<section>
			<h3>Bible Citations</h3>

			<figure>
				<blockquote>
					<p>{b.text_quote ?? ''}</p>
				</blockquote>
				<figcaption>
					— The Bible, {b.book_title ?? ''}
					{b.chapter ?? ''}{b.verse ? `:${b.verse}` : ''}
				</figcaption>
			</figure>
		</section>
	{/if}
	<!-- SHAKESPEARE CITATIONS -->
	{#if proverb.shakespeare_citations}
		<section>
			<h3>Shakespeare Citations</h3>
			{#each proverb.shakespeare_citations as s}
				<figure>
					<blockquote>
						<p>{s.text_quote}</p>
					</blockquote>
					<figcaption>
						— <cite>{s.title_abbr}</cite>,
						{s.act ?? ''}{s.scene ? `.${s.scene}` : ''}
					</figcaption>
				</figure>
			{/each}
		</section>
	{/if}

	<!-- CROSS REFERENCES -->
	{#if proverb.xref_items && proverb.xref_items.length > 0}
		<section>
			<h3>Cross References</h3>
			<!-- `not-prose` is still essential here to protect our custom link styles -->
			<ul class="not-prose m-0 list-none space-y-1 pl-0">
				{#each proverb.xref_items as xref}
					{#if xref.proverb_id}
						<li>
							{#if validXrefs.has(xref.proverb_id.toUpperCase())}
								<a href={`/proverbs/${xref.proverb_id}`} class="tp_a">
									<span class="tp_b">{xref.proverb_id}</span>
									<span class="tp_c underline">{xref.proverb_text ?? ''}</span>
								</a>
							{:else}
								<div class="flex items-baseline rounded-lg p-3">
									<span class="tp_b text-slate-400">{xref.proverb_id}</span>
									<span class="tp_c text-slate-400">{xref.proverb_text ?? ''}</span>
								</div>
							{/if}
						</li>
					{/if}
					{#if xref.note_text}
						<li class="p-3 text-sm text-slate-600">
							{xref.note_text ?? ''}
						</li>
					{/if}
				{/each}
			</ul>
		</section>
	{/if}
	{#if proverb.annotations && proverb.annotations.length > 0}
		<section>
			<h3>Annotations</h3>
			<ol>
				{#each proverb.annotations as note}
					{#if note.text.length > 2}
						<li>{note.text}</li>
					{/if}
				{/each}
			</ol>
		</section>
	{/if}

	{#if proverb.explanation}
		<section>
			<h3>Explanation</h3>
			<p><em>[{proverb.explanation}]</em></p>
		</section>
	{/if}
</div>
