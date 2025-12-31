<script lang="ts">
	import { type IPortfolioItem } from '../../sections/portfolio.svelte';
	import { pushState } from '$app/navigation';

	const { portfolioItem }: { portfolioItem: IPortfolioItem } = $props();

	const openPortfolioItem = () => {
		pushState(`#portfolio?isPortfolioExpanded=true&activePortfolioItemId=${portfolioItem.id}`, {
			isPortfolioExpanded: true,
			activePortfolioItemId: portfolioItem.id
		});
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<li
	id={portfolioItem.id}
	onclick={openPortfolioItem}
	class="image-card"
	style="background-image: url('{portfolioItem.thumbnail.url}'); aspect-ratio: {portfolioItem.thumbnail.aspectRatio}"
></li>

<style>
	.image-card {
		position: relative;
		height: 340px;
		aspect-ratio: 4 / 3;
		border-radius: var(--border-radius-3);
		cursor: pointer;
		border: 1px solid var(--primary-borders);
		background-size: cover;
		background-position: center;
		box-shadow: var(--primary-shadow-1);
		bottom: 0;
		transition: bottom var(--default-animation-duration);

		@media (hover:hover) {
			&:hover {
				bottom: 10px
			}
 		}
	}
</style>
