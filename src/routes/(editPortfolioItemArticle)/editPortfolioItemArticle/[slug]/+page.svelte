<script lang="ts">
	import PortfolioArticleHeader from '$siteComponents/molecules/portfolio/portfolioArticleHeader.svelte';
	import PortfolioItemDetailWrapper from '$siteComponents/organisms/portfolio/portfolioItemDetailWrapper.svelte';
	import PortfolioItemEdit from './components/portfolioItemEdit.svelte';
	import type { PageData } from './$types';
	import type { ButtonActionStatus } from '$siteComponents/atoms/button.svelte';
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import type { Upload } from '$lib/server/db/schema/uploads';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import PortfolioArticleBody from '$siteComponents/molecules/portfolio/portfolioArticleBody.svelte';
	import { invalidateAll } from '$app/navigation';

	type ArticleEditorMode = 'edit' | 'preview';

	export interface IArticleEditorContext {
		saveCallback: () => void;
		togglePublishedCallback: () => void;
		savingStatus?: ButtonActionStatus;
		closingStatus?: ButtonActionStatus;
		togglePublishStatus?: ButtonActionStatus;
		toggleEditModeStatus?: ButtonActionStatus;
		isPublished: boolean;
		toggleEditorModeCallback: () => void;
		editorMode: ArticleEditorMode;
	}

	let { data }: { data: PageData } = $props();

	let savingStatus: ButtonActionStatus | undefined = $state();
	let closingStatus: ButtonActionStatus | undefined = $state();
	let togglePublishStatus: ButtonActionStatus | undefined = $state();
	let toggleEditModeStatus: ButtonActionStatus | undefined = $state();
	let editor: EditorJS | undefined = $state();
	let unSavedUploadedImages: Upload[] = $state([]);
	// svelte-ignore state_referenced_locally
	let isPublished = $state(data.portfolioItem.published);
	let editorMode: ArticleEditorMode = $state('edit');

	const close = async () => {
		closingStatus = 'processing';

		if (unSavedUploadedImages.length) {
			for (const upload of unSavedUploadedImages) {
				await fetch(`/deleteUpload/${upload.title}`, {
					method: 'POST'
				});
			}
		}

		history.back();
	};

	const save = async () => {
		if (!editor) return;
		savingStatus = 'processing';

		try {
			const articleContent: OutputData = await editor.save();

			await fetch(`/updatePortfolioItemArticle/${data.portfolioItem.id}`, {
				method: 'POST',
				body: JSON.stringify({ articleContent: articleContent }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			unSavedUploadedImages = [];
			savingStatus = 'success';
		} catch (error) {
			savingStatus = 'fail';
			console.log(error);
		}
	};

	const togglePublished = async () => {
		togglePublishStatus = 'processing';

		try {
			const response = await fetch(`/updatePortfolioItemPublished/${data.portfolioItem.id}`, {
				method: 'POST',
				body: JSON.stringify({ published: !isPublished }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			isPublished = ((await response.json()) as { portfolioItem: IPortfolioItem; status: number }).portfolioItem.published;
		} catch (error) {
			togglePublishStatus = 'fail';
			console.log(error);
		}

		togglePublishStatus = 'success';
	};

	const toggleEditorMode = async () => {
		toggleEditModeStatus = 'processing';

		try {
			await save();

			if (editorMode == 'edit') {
				editorMode = 'preview';
			} else {
				editorMode = 'edit';
			}

			invalidateAll();

			toggleEditModeStatus = undefined;
		} catch (error) {
			toggleEditModeStatus = 'fail';
			console.log(error);
		}
	};

	$effect(() => {
		if (savingStatus == 'fail' || savingStatus == 'success') {
			setTimeout(() => {
				savingStatus = undefined;
			}, 2000);
		}

		if (togglePublishStatus == 'fail' || togglePublishStatus == 'success') {
			setTimeout(() => {
				togglePublishStatus = undefined;
			}, 2000);
		}

		if (toggleEditModeStatus == 'fail') {
			setTimeout(() => {
				toggleEditModeStatus = undefined;
			}, 2000);
		}
	});

	let editorContext: IArticleEditorContext = $derived({
		saveCallback: save,
		togglePublishedCallback: togglePublished,
		togglePublishStatus: togglePublishStatus,
		isPublished: isPublished,
		savingStatus: savingStatus,
		closingStatus: closingStatus,
		toggleEditorModeCallback: toggleEditorMode,
		editorMode: editorMode,
		toggleEditModeStatus: toggleEditModeStatus
	});
</script>

<PortfolioItemDetailWrapper closeCallback={close} {editorContext}>
	<PortfolioArticleHeader portfolioItem={data.portfolioItem} />

	{#if editorMode == 'edit'}
		<PortfolioItemEdit portfolioItem={data.portfolioItem} bind:editor bind:unSavedUploadedImages />
	{:else}
		<PortfolioArticleBody portfolioItem={data.portfolioItem} />
	{/if}
</PortfolioItemDetailWrapper>
