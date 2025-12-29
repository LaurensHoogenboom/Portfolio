<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children,
		id,
		fullHeight = false,
		theme = 'light',
		CSSHeight = '',
        CSSClass=""
	}: {
		children?: Snippet;
		id?: string;
		fullHeight?: boolean;
		theme?: 'dark' | 'dark-gradient' | 'transparent' | 'light';
		CSSHeight?: string;
        CSSClass?: string;
	} = $props();

	let contentContainer: HTMLDivElement;
	let themeClass = theme == 'dark' 
        ? 'section-dark' 
        : theme == 'dark-gradient' 
            ? 'section-dark gradient' 
            : theme == 'transparent' 
				? 'transparent'
				: 'section-light';

	$effect(() => {
		if (fullHeight) {
			contentContainer.scrollIntoView({ behavior: 'smooth' });
		}
	});
</script>

<div
    {id}
	bind:this={contentContainer}
	class="content-container-wrapper {fullHeight ? 'fullHeight' : ''} {themeClass} {CSSClass}"
    style="{CSSHeight ? `height: ${CSSHeight}` : ''};"
>
	<div class="content-container">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
