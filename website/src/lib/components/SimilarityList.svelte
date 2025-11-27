<script lang="ts">
	import type { SimilarProverbWithSummary } from '$lib/types';
	let { title, items } = $props<{
		title: string;
		items: SimilarProverbWithSummary[];
	}>();

	function formatScore(score: number): string {
		return `${(score * 100).toFixed(1)}%`;
	}
</script>

{#if items.length > 0}
	<!-- Add a top border and padding to create the separator -->
	<div class="mt-12 border-t border-slate-200 pt-8">
		<h3 class="mt-0 text-xl font-semibold">{title}</h3>
		<ul class="list-none space-y-2 pl-0">
			{#each items as p}
				<li>
					<a
						href={`/proverbs/${p.id}`}
						class="group block rounded-lg p-3 no-underline transition-colors hover:bg-slate-100"
					>
						<div class="flex items-start justify-between gap-4">
							<div class="flex-grow">
								<span class="font-semibold text-slate-700 group-hover:text-blue-600">
									{p.proverb_id}
								</span>
								<span class="ml-2 font-serif text-slate-600">{p.proverb_text}</span>
							</div>

							<div
								class="flex-shrink-0 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700"
							>
								{formatScore(p.score)}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
