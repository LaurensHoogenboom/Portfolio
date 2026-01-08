<script lang="ts">
	import { goto } from '$app/navigation';
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioItemDetailWrapper from '$siteComponents/organisms/portfolio/portfolioItemDetailWrapper.svelte';
	import { onMount } from 'svelte';
	import PortfolioItemEdit from '../components/portfolioItemEdit.svelte';
    import type { ActionData, PageData } from './$types';
    import EditorJS, { type OutputData } from "@editorjs/editorjs";
    import Header from "@editorjs/header";

    let { data, form }: { data: PageData, form: ActionData | undefined } = $props();

    const close = () => {
        goto('/cms/portfolio');
    }

    const save = () => {
        if (!editor) return;

        editor.save().then(async (articleContent: OutputData) => {
            const response = await fetch(`/editPortfolioItemArticle/${data.portfolioItem.id}`, {
                method: 'POST',
                body: JSON.stringify({ articleContent: articleContent }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(await response.json());
        }).catch(error => {
            console.log(error);
        });
    }

    let editor: EditorJS;

    onMount(() => {
        editor = new EditorJS({
            holder: 'editor',
            tools: {
                header: Header
            },
            data: data.portfolioItem.articleContent ?? undefined
        });
    });
</script>

<PortfolioItemDetailWrapper closeCallback={close} saveCallback={save} hasOverflow={true}>
    <PortfolioArticleHeader portfolioItem={data.portfolioItem} />
    <PortfolioItemEdit portfolioItem={data.portfolioItem}/>

    <div id="editor"></div>
</PortfolioItemDetailWrapper>

