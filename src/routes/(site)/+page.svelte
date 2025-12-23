<script lang="ts">
    import type { PageData } from './$types';
	import About from './components/organisms/about.svelte';
	import Contact from './components/organisms/contact.svelte';
	import Header from './components/organisms/header.svelte';
	import PortfolioSection, { type IPortfolioItem } from './components/organisms/portfolioSection.svelte';

    let { data }: { data: PageData } = $props();

    const portfolioItems: IPortfolioItem[] = data.posts.map(p => {
            return {
                id: p.id,
                title: p.title,
                type: "project"
            }
        }
    )
</script>

<Header portfolioItems = {portfolioItems} />

<About />

<PortfolioSection portfolioItems={portfolioItems}/>

<Contact />