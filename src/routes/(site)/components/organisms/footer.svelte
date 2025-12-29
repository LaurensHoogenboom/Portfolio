<script lang="ts">
	import ContentContainer from "../atoms/contentContainer.svelte";

    let currentYear = new Date().getFullYear();
</script>



<footer>
    <ContentContainer>
        Copyright &copy; Laureato.nl {currentYear}
    </ContentContainer>
</footer>

<style>
    footer {
        display: flex;
        height: 100%;
        align-items: center;
        height: calc(150px + 2 * var(--border-radius-3));
    }
</style>