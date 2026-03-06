<script lang="ts">
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import Button from '$siteComponents/atoms/button.svelte';
	import { type OutputBlockData } from '@editorjs/editorjs';
	import Accordion from '../accordion.svelte';
	import { Download } from '@lucide/svelte';
	import Slider, { type ISlide } from '../slider.svelte';
	import ImageContainer from '$siteComponents/atoms/imageContainer.svelte';

	const { portfolioItem }: { portfolioItem: IPortfolioItem } = $props();

	const blockIsAccordionChild = (index: number) => {
		if (!portfolioItem.articleContent) return false;
		const closestAccordion = portfolioItem.articleContent.blocks
			.slice(0, index)
			.filter((b) => b.type == 'accordion')
			.pop();

		if (!closestAccordion) return false;
		const closestAccordionIndex = portfolioItem.articleContent.blocks.findIndex((b) => b.id == closestAccordion.id);

		if (index > closestAccordionIndex && index <= closestAccordionIndex + closestAccordion.data.settings.blockCount) {
			return true;
		} else return false;
	};

	const getSlides = (sliderName: string): ISlide[] => {
		if (!portfolioItem.articleContent) return [];

		let slides: ISlide[] = [];

		portfolioItem.articleContent.blocks.forEach((b) => {
			if (b.type == 'image') {
				const inlineSettings = b.data.caption.split('@');
				const url = b.data.file.url;
				const caption = inlineSettings[0];
				const sName = inlineSettings[1];

				if (sName == sliderName && url && caption && b.id) {
					slides.push({
						id: b.id,
						imgUrl: url,
						caption: caption
					});
				}
			}
		});

		return slides;
	};
</script>

<div class="body">
	{#if portfolioItem.articleContent}
		{#each portfolioItem.articleContent.blocks as b, i}
			{#if !blockIsAccordionChild(i)}
				{#if b.type != 'columns' && b.type != 'accordion'}
					{@render contentBlock(b)}
				{/if}

				{#if b.type == 'columns'}
					<div class={`grid-container columns-${b.data.cols.length}`}>
						{#each b.data.cols as c}
							<div>
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

{#snippet contentBlock(b: OutputBlockData<string, any>)}
	{#if b.type == 'header'}
		<h2 id={b.id}>{@html b.data.text}</h2>
	{/if}

	{#if b.type == 'paragraph'}
		<p>{@html b.data.text}</p>
	{/if}

	{#if b.type == 'button'}
		{@const inlineSettings: string[] = b.data.label.split('@')}
		{@const title: string = inlineSettings[0]}

		<Button
			type={b.data.target == '_blank' ? 'goto-external' : 'goto'}
			href={b.data.url}
			{title}
			style={inlineSettings.includes('secondary') ? 'secondary' : undefined}
			icon={inlineSettings.includes('download') ? Download : undefined}
			stretched={b.data.stretched}
		/>
	{/if}

	{#if b.type == 'image'}
		{@const inlineSettings: string[] = b.data.caption.split('@')}
		{@const title: string = inlineSettings[0]}
		{@const isSlider = inlineSettings[1] && inlineSettings[1].startsWith('slider')}
		{@const isFirstSlide = isSlider && parseInt(inlineSettings[2]) == 1}

		{#if isSlider && isFirstSlide}
			<Slider slides={getSlides(inlineSettings[1])} />
		{/if}

		{#if !isSlider}
			<ImageContainer imgUrl={b.data.file.url} caption={title} showCaption={true} showShadow={true} />
		{/if}
	{/if}

	{#if b.type == 'list' && b.data.style == 'unordered'}
		<ul>
			{#each b.data.items as i}
				<li>{@html i.content}</li>
			{/each}
		</ul>
	{/if}

	{#if b.type == 'list' && b.data.style == 'ordered'}
		<ol>
			{#each b.data.items as i}
				<li>{@html i.content}</li>
			{/each}
		</ol>
	{/if}

	{#if b.type == 'quote'}
		<blockquote class="quote">{b.data.text}</blockquote>
	{/if}
{/snippet}

<style>
	.body {
		margin-top: var(--spacing-6);

		h2 {
			margin-top: var(--spacing-4);
		}

		p,
		li,
		blockquote {
			max-width: 850px;
		}
	}

	:global(.body > .button) {
		margin-bottom: var(--spacing-4);
	}
</style>
