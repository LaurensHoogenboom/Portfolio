<script lang="ts">
	import { goto } from '$app/navigation';
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioItemDetailWrapper from '$siteComponents/organisms/portfolio/portfolioItemDetailWrapper.svelte';
	import PortfolioItemEdit from '../components/portfolioItemEdit.svelte';
	import type { ActionData, PageData } from './$types';
	import type { ButtonActionStatus } from '$siteComponents/atoms/button.svelte';
	import EditorJS, { type OutputData } from '@editorjs/editorjs';

	let { data, form }: { data: PageData; form: ActionData | undefined } = $props();
	let savingStatus: ButtonActionStatus | undefined = $state();
	let editor: EditorJS | undefined = $state();

	const close = () => {
		goto('/cms/portfolio');
	};

	const save = () => {
		if (!editor) return;

        savingStatus = 'processing';

		editor
			.save()
			.then(async (articleContent: OutputData) => {
				await fetch(`/editPortfolioItemArticle/${data.portfolioItem.id}`, {
					method: 'POST',
					body: JSON.stringify({ articleContent: articleContent }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				savingStatus = 'success';
			})
			.catch((error) => {
                savingStatus = 'fail';
				console.log(error);
			});
	};

    $effect(() => {
        if (savingStatus == 'fail' || savingStatus == 'success') {
            setTimeout(() => {
                savingStatus = undefined;
            }, 2000);
        }
    });
</script>

<PortfolioItemDetailWrapper closeCallback={close} saveCallback={save} {savingStatus} hasOverflow={true}>
	<PortfolioArticleHeader portfolioItem={data.portfolioItem} />
	<PortfolioItemEdit portfolioItem={data.portfolioItem} bind:editor={editor} />
</PortfolioItemDetailWrapper>


