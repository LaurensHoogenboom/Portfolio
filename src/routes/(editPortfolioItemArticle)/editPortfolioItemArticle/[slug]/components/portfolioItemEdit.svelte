<script lang="ts">
	import { onMount } from 'svelte';
	import EditorJS, { type BlockToolConstructable, type EditorConfig, type ToolSettings } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Paragraph from '@editorjs/paragraph';
	import Button from '@ikbenbas/editorjs-button';
	import EditorjsColumns from '@calumk/editorjs-columns';
	import Accordion from 'editorjs-collapsible-block';
	import ImageTool from '@editorjs/image';
	import type { IPortfolioItem } from '$lib/types/portfolio';
	import type { Upload } from '$lib/types/uploads';

	let { portfolioItem, editor = $bindable() }: { portfolioItem: IPortfolioItem; editor?: EditorJS } = $props();
	let addedImages: Upload[] = $state([]);

	const sanitize = {
		b: true,
		i: true,
		strong: true,
		a: true
	}

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
			class: ImageTool,
			config: {
				uploader: {
					uploadByFile: async (file: File) => {
						const formData = new FormData();
						formData.append('image', file);

						const response = await fetch('/uploadImage', {
							method: 'POST',
							body: formData
						});

						const json = await response.json();
						addedImages.push(json.upload as Upload);

						return json;
					}
				}
			}
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
			tools: {...contentTools, ...layoutTools},
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

		:global(.ce-paragraph) {
			color: var(--grey-text);
			max-width: 850px;
		}

		:global(.accordion-wrapper) {
			color: var(--grey-text);
			background-color: var(--grey-inset-background);
			border-radius: 15px 15px 0 0;
		}

		:global(.ce-block:not([data-readonly]):has(.accordion-wrapper) + .ce-block:not([data-accordion-wrapper]) .ce-block__content) {
			width: 100%;
			background-color: var(--grey-inset-background-light);
		}

		:global([data-accordion-wrapper]:not([data-readonly])) {
			margin-top: var(--spacing-4);
		}
	}
</style>
