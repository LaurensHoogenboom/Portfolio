<script lang="ts">
	import Button from '../atoms/button.svelte';
	import ContentContainer from '../atoms/contentContainer.svelte';
	import PortfolioPrevew from '../organisms/portfolioPrevew.svelte';
	import { type IPortfolioItem } from './portfolio.svelte';

	const { portfolioItems }: { portfolioItems: IPortfolioItem[] } = $props();
</script>

<ContentContainer id="header" theme="dark-gradient" CSSHeight="calc(100vh - 150px)">
	<div class="header-content">
		<article>
			<h1>Home</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ullamcorper quam, laoreet eleifend lorem. Duis finibus sem ante, et
				iaculis eros blandit vitae. Nunc eleifend sed nibh at posuere. Vivamus non rhoncus lorem.
			</p>
            <Button type="goto" href="#portfolio" title="Portfolio"/>
            <Button type="goto" href="#contact" title="Contact" style="secondary"/>
		</article>

		<PortfolioPrevew previewItems={portfolioItems} />
	</div>
</ContentContainer>

<style>
	:global(#header) {
		position: relative;
		z-index: 1;
		border-bottom-left-radius: var(--border-radius-3);
		border-bottom-right-radius: var(--border-radius-3);
	}

	.header-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 50px;
		height: 100%;
		align-items: center;

		h1:after {
			content: 'D';
            opacity: 0.3;
		}
	}
</style>
