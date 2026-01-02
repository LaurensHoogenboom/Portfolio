<script lang="ts">
	import AnimatedMouseWheel from '../atoms/header/animatedMouseWheel.svelte';
	import Button from '../atoms/button.svelte';
	import ContentContainer from '../atoms/contentContainer.svelte';
	import PortfolioPrevew from '../organisms/header/portfolioPrevew.svelte';
	import type { IPortfolioItem } from '$lib/server/db/types/portfolio';
	import Title from '../atoms/header/title.svelte';

	const { portfolioItems }: { portfolioItems: IPortfolioItem[] } = $props();
</script>

<ContentContainer id="header" theme="dark-gradient" CSSHeight="calc(100vh - 150px)">
	<div class="header-content">
		<article>
			<Title />

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ullamcorper quam, laoreet eleifend lorem. Duis finibus sem ante, et
				iaculis eros blandit vitae. Nunc eleifend sed nibh at posuere. Vivamus non rhoncus lorem.
			</p>
            <Button type="goto" href="#portfolio" title="Portfolio"/>
            <Button type="goto" href="#contact" title="Contact" style="secondary"/>
		</article>

		<PortfolioPrevew previewItems={portfolioItems} />
	</div>

	<AnimatedMouseWheel style="left: 50%; transform: translateX: (-50%);"/>
</ContentContainer>

<style>
	:global(#header) {
		position: relative;
		z-index: 1;
		border-bottom-left-radius: var(--border-radius-3);
		border-bottom-right-radius: var(--border-radius-3);

		article {
			padding-bottom: var(--spacing-6);
		}
	}

	.header-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 50px;
		height: 100%;
		align-items: center;
	}
</style>
