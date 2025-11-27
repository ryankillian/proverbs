<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import FlatCollectionSchema from '$lib/components/seo/FlatCollectionSchema.svelte';
	import GroupedCollectionSchema from '$lib/components/seo/GroupedCollectionSchema.svelte';
	import type { ProverbSummary } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { title, grouped, data: pageData, slug, seo, count, breadcrumb, pageUrl } = data;

	function formatCitation(type: string, cit: any): string {
		if (type === 'shakespeare') {
			return `${cit.act ?? ''}${cit.scene ? '.' + cit.scene : ''}`;
		}
		if (type === 'bible') {
			return `${cit.chapter ?? ''}${cit.verse ? ':' + cit.verse : ''}`;
		}
		return '';
	}

	const groupsForSchema = grouped
		? pageData.map((group) => ({
				name: group.full_title,
				slug: group.slug,
				url: `${pageUrl}#${group.slug}`, // Link to the section on the page
				count: group.citations.length
			}))
		: [];
</script>

<Seo {...seo} />
{#if grouped}
	<GroupedCollectionSchema collectionName={title} groups={groupsForSchema} {pageUrl} {breadcrumb} />
{:else}
	<FlatCollectionSchema collectionName={title} proverbs={pageData} {pageUrl} {breadcrumb} />
{/if}

<div class="prose mx-auto max-w-3xl">
	<h1 class="mb-8 text-3xl font-bold tracking-tight text-slate-800">Proverbs from {title}</h1>

	{#if grouped}
		{@const groupedData = pageData as {
			slug: string;
			full_title?: string;
			title_abbr?: string;
			book_title?: string;
			citations: any[];
		}[]}
		{#if grouped}
			<p class="mb-8 text-slate-600">
				Found {count} related proverbs across {pageData.length} works. Click on any proverb below to
				view the full analysis and original text.
			</p>
		{/if}

		<!-- 1. ADD THE TABLE OF CONTENTS -->
		<nav
			aria-label="Table of contents for this page"
			class="not-prose mb-12 rounded-lg border border-slate-200 bg-slate-50 p-4"
		>
			<ul class="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-1 p-0 sm:grid-cols-3">
				{#each groupedData as group}
					<li>
						<a
							href={`#${group.slug}`}
							class=" font-medium text-slate-600 underline hover:text-slate-800"
						>
							{group.full_title || group.title_abbr || group.book_title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- 2. RENDER THE SECTIONS WITH IDs -->
		<div class="space-y-10">
			{#each groupedData as group}
				<!-- Add the id and scroll-margin-top here -->
				<section id={group.slug} class="scroll-mt-24">
					<h3 class="tp_j">{group.full_title}</h3>
					{#if group.citations.length == 1}
						<p class="tp_k">{group.citations.length} related proverb.</p>
					{:else}
						<p class="tp_k">{group.citations.length} related proverbs.</p>
					{/if}
					<ul class="not-prose l">
						{#each group.citations as item}
							<li>
								<a href={`/proverbs/${item.proverb_id}`} class="cite-item">
									<span class="cite-ref">
										{formatCitation(slug, item.citation)}
									</span>
									<span class="cite-text">{item.proverb_text}</span>
								</a>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	{:else}
		{@const summaries = pageData as ProverbSummary[]}
		{#if summaries.length > 0}
			<p class="mb-6 text-slate-600">
				Found {summaries.length} related proverbs. Click on any proverb below to view the full analysis
				and original text.
			</p>
			<ul class="not-prose list-none space-y-1 pl-0">
				{#each summaries as p}
					<li>
						<a href={`/proverbs/${p.proverb_id}`} class="tp_a">
							<span class="tp_b">
								{p.proverb_id}
							</span>
							<span class="tp_c">{p.proverb_text}</span>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-slate-600">No proverbs found for this collection.</p>
		{/if}
	{/if}
</div>
