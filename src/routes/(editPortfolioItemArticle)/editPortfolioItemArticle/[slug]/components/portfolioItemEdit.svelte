<script lang="ts">
	import { onMount } from 'svelte';
	import EditorJS, { type BlockToolConstructable } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Paragraph from '@editorjs/paragraph';
	import Button from '@ikbenbas/editorjs-button';
	import EditorjsColumns from '@calumk/editorjs-columns';
	import Accordion from 'editorjs-collapsible-block';
	import EditorjsList from '@editorjs/list';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import type { Upload } from '$lib/types/uploads';
	import { CustomImage } from './customImageTool';

	let {
		portfolioItem,
		editor = $bindable(),
		unSavedUploadedImages = $bindable()
	}: { portfolioItem: IPortfolioItem; editor?: EditorJS; unSavedUploadedImages: Upload[] } = $props();

	const uploadImage = async (file: File) => {
		const formData = new FormData();
		formData.append('image', file);

		const response = await fetch('/uploadImage', {
			method: 'POST',
			body: formData
		});

		const json = await response.json();

		if (json.upload) {
			unSavedUploadedImages.push(json.upload as Upload);
		}

		return json;
	};

	const sanitize = {
		b: true,
		i: true,
		strong: true,
		a: true
	};

	const contentTools = {
		header: Header,
		paragraph: {
			class: Paragraph as BlockToolConstructable,
			config: {
				preserveBlank: true
			},
			sanitize: sanitize
		},
		button: {
			class: Button,
			config: {
				classes: ['button']
			}
		},
		accordion: {
			class: Accordion,
			sanitize: sanitize
		},
		image: {
			class: CustomImage as any,
			config: {
				uploader: {
					uploadByFile: uploadImage
				}
			}
		},
		list: {
			class: EditorjsList,
			inlineToolbar: true,
			config: {
				defaultStyle: 'unordered'
			},
			sanitize: sanitize,
			maxLevel: 1
		}
	};

	const layoutTools = {
		columns: {
			class: EditorjsColumns,
			config: {
				EditorJsLibrary: EditorJS,
				tools: contentTools
			}
		}
	};

	onMount(() => {
		editor = new EditorJS({
			holder: 'editor',
			tools: { ...contentTools, ...layoutTools },
			defaultBlock: 'paragraph',
			data: portfolioItem.articleContent ?? undefined
		});
	});
</script>

<div id="editor"></div>

<style>
	#editor {
		width: 90%;
		margin: 0 auto;
		margin-top: var(--spacing-6);

		:global(.ce-paragraph, .cdx-list__item-content) {
			color: var(--grey-text);
			max-width: 850px;
		}

		:global(.accordion-wrapper) {
			color: var(--grey-text);
			background-color: var(--grey-inset-background);
			border-radius: 15px 15px 0 0;
		}

		:global(.ce-block:not([data-accordion-wrapper]) .ce-block__content) {
			width: 100%;
		}

		:global(.image-tool) {
			max-width: 850px;
			margin: 0 auto;
		}

		:global([data-accordion-wrapper]:not([data-readonly])) {
			margin-top: var(--spacing-4);
		}

		:global(img) {
			max-height: 80dvh;
			min-height: 200px;
			max-width: 100%;
			object-fit: cover;
			border-radius: var(--border-radius-2);
			filter: drop-shadow(var(--grey-shadow-1));
			margin: 0 auto;
			margin-bottom: var(--spacing-4);
		}
	}
</style>
