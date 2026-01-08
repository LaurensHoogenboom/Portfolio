<script lang="ts">
	import { onMount } from 'svelte';
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Paragraph from '@editorjs/paragraph';
	import Button from '@ikbenbas/editorjs-button';
	import EditorjsColumns from '@calumk/editorjs-columns';
	import type { IPortfolioItem } from '$lib/types/portfolio';

    let { portfolioItem, editor = $bindable() } : { portfolioItem: IPortfolioItem, editor?: EditorJS } = $props();

    onMount(() => {
		editor = new EditorJS({
			holder: 'editor',
			tools: {
				header: Header,
				paragraph: Paragraph,
				button: {
                    class: Button,
                    config: {
                        classes: ["button"]
                    }
                },
				columns: {
					class: EditorjsColumns,
					config: {
						EditorJsLibrary: EditorJS,
						tools: {
							paragraph: Paragraph,
							button: Button
						}
					}
				}
			},
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
	}
</style>