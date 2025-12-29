<script lang="ts">
    import ContentContainer from "../atoms/contentContainer.svelte";
</script>

<ContentContainer id="contact" theme="transparent">
    <h1>Contact</h1>
</ContentContainer>

<style>
    :global(#contact) {
        margin-top: calc(0px - var(--border-radius-3));
        padding-top: calc(var(--spacing-8) + var(--border-radius-3));
        background: var(--primary-background-gradient);
        border-bottom-left-radius: var(--border-radius-3);
        border-bottom-right-radius: var(--border-radius-3);

        :global(.content-container) {
            background-color: var(--white);
            border-radius: var(--border-radius-3);
            margin-bottom: calc(0px - var(--border-radius-3) * 2);
            z-index: 1;
        }
    }
</style>