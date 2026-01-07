<script lang="ts">
	import { goto } from '$app/navigation';
	import PortfolioItemDetailWrapper from '$siteComponents/organisms/portfolio/portfolioItemDetailWrapper.svelte';
	import PortfolioItemEdit from '../components/portfolioItemEdit.svelte';
    import type { ActionData, PageData } from './$types';

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();

    const close = () => {
        goto('/cms/portfolio');
    }

    const save = () => {
        console.log('save')
    }
</script>

<PortfolioItemDetailWrapper closeCallback={close} saveCallback={save}>
    <PortfolioItemEdit portfolioItem={data.portfolioItem}/>
</PortfolioItemDetailWrapper>

