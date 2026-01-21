<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		children,
		id,
		fullHeight = false,
		theme = 'light',
        CSSClass="",
		width = "contained"
	}: {
		children?: Snippet;
		id?: string;
		fullHeight?: boolean;
		theme?: 'dark' | 'dark-gradient' | 'transparent' | 'light';
        CSSClass?: string;
		width?: "contained" | "wide";
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
	class="content-container-wrapper {themeClass} {CSSClass}"
>
	<div class="content-container {width}">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
