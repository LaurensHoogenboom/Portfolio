<script lang="ts">
	import { Folder, IdCard, Mail } from "@lucide/svelte";
    import Button from "../atoms/button.svelte";
</script>

<nav class="content-container-wrapper section-dark">
    <div class="content-container">
        <h1 class="logo">Laurens Hoogenboom</h1>

        <hr />

        <div class="toolbar">
            <Button type="goto" href="#about" title="Over" icon={IdCard} style="inline" />
            <Button type="goto" href="#portfolio" title="Portfolio" icon={Folder} style="inline" />
            <Button type="goto" href="#contact" title="Contact" icon={Mail} style="inline" />
        </div>
    </div>
</nav>

<style>
    nav {
        position: relative;
        width: 100%;
        height: 100px;
        border-bottom-left-radius: var(--border-radius-3);
        border-bottom-right-radius: var(--border-radius-3);
        z-index: 2;

        .content-container {
            display: grid;
            grid-template-columns: max-content 1fr max-content;
            align-items: center;
            grid-gap: var(--spacing-4);

            h1:after {
                content: 'LTH';
                font-size: 60px;
                top: 15px;
                left: 50%;
                transform: translateX(-50%) translateY(0);
                opacity: 0.2;
                line-height: 60px;
            }

            .toolbar {
                display: grid;
                grid-gap: 30px;
                grid-auto-flow: column;
                align-items: center;
            }
        }

        .logo {
            font-size: 30px;
            font-family: "Adobe Handwriting";
            padding-bottom: 0;
            font-weight: normal;
        }
    }
</style>