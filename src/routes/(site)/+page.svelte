<script lang="ts">
    import type { PageData } from './$types';
    import ContentContainer from './components/atoms/contentContainer.svelte';
	import PortfolioSection, { type IPortfolioItem } from './components/organisms/portfolioSection.svelte';

    let { data }: { data: PageData } = $props();

    const portfolioItems: IPortfolioItem[] = data.posts.map(p => {
            return {
                title: p.title,
                type: "project"
            }
        }
    )
</script>

<ContentContainer id="header">
    <h1>Home</h1>
</ContentContainer>

<ContentContainer id="about">
    <h1>About</h1>
</ContentContainer>

<PortfolioSection portfolioItems={portfolioItems}/>

<ContentContainer id="contact">
    <h1>Contact</h1>
</ContentContainer>