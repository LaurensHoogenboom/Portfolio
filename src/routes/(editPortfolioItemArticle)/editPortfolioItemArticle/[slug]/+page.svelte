<script lang="ts">
	import { goto } from '$app/navigation';
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioItemDetailWrapper from '$siteComponents/organisms/portfolio/portfolioItemDetailWrapper.svelte';
	import PortfolioItemEdit from './components/portfolioItemEdit.svelte';
	import type { PageData } from './$types';
	import type { ButtonActionStatus } from '$siteComponents/atoms/button.svelte';
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import type { Upload } from '$lib/types/uploads';

	let { data }: { data: PageData } = $props();
	let savingStatus: ButtonActionStatus | undefined = $state();
	let closingStatus: ButtonActionStatus | undefined = $state();
	let editor: EditorJS | undefined = $state();
	let unSavedUploadedImages: Upload[] = $state([]);

	const close = async () => {
		closingStatus = 'processing';

		if (unSavedUploadedImages.length) {
			for (const upload of unSavedUploadedImages) {
				await fetch(`/deleteUpload/${upload.title}`, {
					method: 'POST'
				});
			}
		}

		goto('/cms/portfolio');
	};

	const save = () => {
		if (!editor) return;

		savingStatus = 'processing';

		editor
			.save()
			.then(async (articleContent: OutputData) => {
				await fetch(`/updatePortfolioItemArticle/${data.portfolioItem.id}`, {
					method: 'POST',
					body: JSON.stringify({ articleContent: articleContent }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				unSavedUploadedImages = [];
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

<PortfolioItemDetailWrapper closeCallback={close} saveCallback={save} {savingStatus} {closingStatus}>
	<PortfolioArticleHeader portfolioItem={data.portfolioItem} />
	<PortfolioItemEdit portfolioItem={data.portfolioItem} bind:editor bind:unSavedUploadedImages />
</PortfolioItemDetailWrapper>
