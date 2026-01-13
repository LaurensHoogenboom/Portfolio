<script lang="ts">
    import type { IPortfolioItem } from "$lib/types/portfolio";
	import { openPortfolioItem } from "../../../utils/portfolioUtils";
	import Button from "$siteComponents/atoms/button.svelte";

    const { portfolioItem } : { portfolioItem: IPortfolioItem } = $props();
</script>

<div class="portfolio-preview-banner">
    <div class="body">
        <div class="thumbnail-wrapper">
            <div class="dummy"></div>
            <div class="real" style="background-image: url({JSON.stringify(portfolioItem.image?.thumbnail.url)});"></div>
        </div>
        <div class="content">
            <article>
                <h2>{portfolioItem.title}</h2>
                <p>{portfolioItem.description}</p>
            </article>
            <Button type="submit" title="Meer Lezen" onclick={() => openPortfolioItem(portfolioItem)} />
        </div>
    </div>
    
    <div class="footer">
    </div>
</div>

<style>
    .portfolio-preview-banner {
        display: grid;

        .body {
            display: grid;
            grid-template-columns: 1.3fr 2fr;
            border-top-left-radius: var(--border-radius-3);
            border-top-right-radius: var(--border-radius-3);
            border: 1px solid var(--grey-borders);
            border-bottom: none;
            clip-path: polygon(-40px -40px, calc(100% + 40px) -40px, calc(100% + 40px) 100%, -40px 100%);
            box-shadow: var(--grey-shadow-2);

            @media (hover:hover) {
                :global(&:has(.content button:hover)) {
                    .thumbnail-wrapper .real {
                        transform: rotate(-1deg) translateY(calc(-105% - 10px)) translateX(20px);
                    }

                    .thumbnail-wrapper .dummy {
                        transform: rotate(-5deg) translateX(-10px);
                    }
                }
            }
        }

        .thumbnail-wrapper {
            background-color: var(--primary-base);
            border-top-left-radius: var(--border-radius-3);

            .dummy, .real {
                width: 93%;
                height: 115%;
                transition: transform var(--default-animation-duration);
            }

            .dummy {
                background-color: var(--grey-inset-background-light);
                transform: rotate(-3deg);
                border: 1px solid var(--grey-borders);
                border-radius: var(--border-radius-2);
            }

            .real {
                transform: rotate(-1deg) translateY(-105%) translateX(30px);
                border-radius: var(--border-radius-2);
                background-size: cover;
                background-position: center;
                border: 1px solid var(--primary-borders);
                box-shadow: var(--grey-shadow-1);
            }
        }

        .footer {
            position: relative;
            border-top: 1px solid var(--primary-base);
            margin-left: calc(0px - var(--spacing-5));
            margin-right: calc(0px - var(--spacing-5));
        }

        .content {
            padding: var(--spacing-5) var(--spacing-6);
        }
    }
</style>