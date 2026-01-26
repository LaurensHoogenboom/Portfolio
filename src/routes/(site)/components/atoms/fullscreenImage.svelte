<script lang="ts">
	import { fullScreenImageState } from '../../shared/fullScreenImageState.svelte';
	import ImageContainer from './imageContainer.svelte';
</script>

{#if fullScreenImageState.state.visible}
	<ImageContainer
		imgUrl={fullScreenImageState.state.imgUrl}
		caption={fullScreenImageState.state.caption}
		showCaption={fullScreenImageState.state.showCaption}
		fullscreen={true}
		CSSClass={fullScreenImageState.state.CSSClass}
		showShadow={true}
	/>
{/if}
