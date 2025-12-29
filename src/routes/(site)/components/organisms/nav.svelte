<script lang="ts">
	import { Folder, IdCard, Mail } from "@lucide/svelte";

</script>

<nav class="content-container-wrapper section-dark">
    <div class="content-container">
        <h1 class="logo">Laurens Hoogenboom</h1>

        <div class="toolbar">
            <a class="button transparent" href="#about">
                <IdCard />
                Over
            </a>
            <a class="button transparent" href="#portfolio">
                <Folder />
                Portfolio
            </a>
            <a class="button transparent" href="#contact">
                <Mail />
                Contact
            </a>
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
            grid-template-columns: 1fr max-content;
            align-items: center;
        }

        .logo {
            font-size: 30px;
            font-family: "Adobe Handwriting";
            padding-bottom: 0;
            font-weight: normal;
        }

        a.button {
            display: inline-flex;
            align-items: center;
            text-decoration: none;
        }
    }
</style>