<script lang="ts">
	import type { IPortfolioItem } from "$lib/types/portfolio";
	import AnimatedMouseWheel from "$siteComponents/atoms/header/animatedMouseWheel.svelte";

    const { portfolioItem } : { portfolioItem: IPortfolioItem } = $props();
</script>

<div class="portfolio-article-header">
    <div class="header-image" style="background-image: url({JSON.stringify(portfolioItem.image?.url)});"></div>
    <article>
        <h1>{portfolioItem.title}</h1>
        <p>{portfolioItem.description}</p>
    </article>
    <AnimatedMouseWheel style="position: relative; justify-self: center;" color="grey" />
</div>

<style>
    .portfolio-article-header{
        display: grid;
        grid-template-rows: 1fr max-content max-content;
        min-height: calc(100vh - var(--spacing-7) - var(--spacing-6));
        width: 100%;
        grid-row-gap:  var(--spacing-6);

        .header-image {
            height: 100%;
            width: 100%;
            background-size: cover;
            background-position: center;
            border-radius: var(--border-radius-2);
            min-height: 400px;
        }

        article {
            justify-self: center;
            text-align: center;

            h1 {
                padding-bottom: var(--spacing-6);
            }

            p {
                max-width: 850px;
                margin: 0 auto;
            }
        }
    }
</style>