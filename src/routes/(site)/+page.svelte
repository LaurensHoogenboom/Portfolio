<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
	import About from './components/organisms/about.svelte';
	import Contact from './components/organisms/contact.svelte';
	import Header from './components/organisms/header.svelte';
	import PortfolioSection, { type IPortfolioItem } from './components/organisms/portfolioSection.svelte';
	import { replaceState } from '$app/navigation';

    let { data }: { data: PageData } = $props();

    const portfolioItems: IPortfolioItem[] = data.posts.map(p => {
            return {
                id: p.id,
                title: p.title,
                type: "project"
            }
        }
    );

    let searchParams = $state(new URLSearchParams());

    onMount(() => {
        const [hash, query] = window.location.href.split('#')[1].split('?');
        searchParams = new URLSearchParams(query);

        const isPortfolioExpanded = searchParams.get('isPortfolioExpanded') == 'true' ? true : false;
        const activePortfolioItemId = searchParams.get('activePortfolioItemId')

        if (isPortfolioExpanded && hash == "portfolio") {
            setTimeout(() => {
                replaceState(`#portfolio?isPortfolioExpanded=${isPortfolioExpanded}&activePortfolioItemId=${activePortfolioItemId}`, {
                    isPortfolioExpanded: isPortfolioExpanded,
                    activePortfolioItemId: activePortfolioItemId ?? undefined
                });
            });
        }
    });
</script>

<Header portfolioItems={portfolioItems} />

<About />

<PortfolioSection portfolioItems={portfolioItems}/>

<Contact />