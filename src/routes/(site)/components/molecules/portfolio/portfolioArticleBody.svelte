<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import Button from '$siteComponents/atoms/button.svelte';
	import { type OutputBlockData } from '@editorjs/editorjs';
	import Accordion from '../accordion.svelte';

	const { portfolioItem }: { portfolioItem: IPortfolioItem } = $props();

	const blockIsAccordionChild = (index: number) => {
		if (!portfolioItem.articleContent) return false;
		const closestAccordion = portfolioItem.articleContent.blocks.slice(0, index).filter(b => b.type == 'accordion').pop();

		if (!closestAccordion) return false;
		const closestAccordionIndex = portfolioItem.articleContent.blocks.findIndex(b => b.id == closestAccordion.id);

		if (index > closestAccordionIndex && index <= closestAccordionIndex + closestAccordion.data.settings.blockCount) {
			return true;
		} else return false;
	}
</script>

<div class="body">
	{#if portfolioItem.articleContent}
		{#each portfolioItem.articleContent.blocks as b, i}
			{#if !blockIsAccordionChild(i)}
				{#if b.type != 'columns' && b.type != 'accordion'}
					{@render contentBlock(b)}
				{/if}

				{#if b.type == 'columns'}
					<div class="columns">
						{#each b.data.cols as c}
							<div class="column">
								{#if c.blocks.length}
									{#each c.blocks as d}
										{@render contentBlock(d)}
									{/each}
								{/if}
							</div>
						{/each}
					</div>
				{/if}

				{#if b.type == 'accordion'}
					<Accordion title={b.data.title} isOpenedByDefault={b.data.settings.defaultExpanded ?? false}>
						{#each portfolioItem.articleContent.blocks.slice(i, i + b.data.settings.blockCount + 1) as c}
							{@render contentBlock(c)}
						{/each}
					</Accordion>
				{/if}
			{/if}			
		{/each}
	{/if}
</div>

{#snippet contentBlock(b:OutputBlockData<string, any>)}
	{#if b.type == 'header'}
		<h2>{b.data.text}</h2>
	{/if}

    {#if b.type == 'paragraph'}
        <p>{@html b.data.text}</p>
    {/if}

    {#if b.type == 'button'}
        <Button type="goto" href={b.data.url} title={b.data.label} />
    {/if}
{/snippet}

<style>
    .body {
        margin-top: var(--spacing-6);

        h2 {
            margin-top: var(--spacing-4);
        }

		p {
			max-width: 850px;
		}
    }

	.columns {
		display: grid;
		grid-auto-flow: column;
		grid-gap: var(--spacing-5);
	}
</style>