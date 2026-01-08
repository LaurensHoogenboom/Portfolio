<script lang="ts">
	import { onMount } from 'svelte';
	import EditorJS, { type BlockToolConstructable, type EditorConfig, type ToolSettings } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Paragraph from '@editorjs/paragraph';
	import Button from '@ikbenbas/editorjs-button';
	import EditorjsColumns from '@calumk/editorjs-columns';
	import Accordion from 'editorjs-collapsible-block';
	import type { IPortfolioItem } from '$lib/types/portfolio';

	let { portfolioItem, editor = $bindable() }: { portfolioItem: IPortfolioItem; editor?: EditorJS } = $props();

	const sanitize = {
		b: true,
		i: true,
		strong: true,
		a: true
	}

	const editorTools = {
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
		}
	};

	const columns = {
		columns: {
			class: EditorjsColumns,
			config: {
				EditorJsLibrary: EditorJS,
				tools: editorTools
			}
		}		
	};

	onMount(() => {
		editor = new EditorJS({
			holder: 'editor',
			tools: {...editorTools, ...columns},
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
