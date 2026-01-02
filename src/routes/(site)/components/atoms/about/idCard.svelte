<script lang="ts">
    const { CSSClass } : { CSSClass?:string } = $props();
</script>

<div class="id-card {CSSClass}">
    <div class="avatar">
        <div class="body"></div>
        <div class="head"></div>
    </div>
    <div class="info">
        <div class="line-1"></div>
        <div class="line-2"></div>
    </div>
</div>

<style>
    .id-card {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: var(--spacing-5);
        height: 300px;
        aspect-ratio: 16 / 8;
        border: 1px solid var(--grey-borders);
        border-radius: var(--border-radius-3);
        background-color: var(--grey-inset-background-light);
        padding: var(--spacing-5);

        .avatar {
            height: 220px;
            aspect-ratio: 1 / 1;
            background-color: var(--grey-inset-background);
            overflow: hidden;
            border: 1px solid var(--grey-borders);
            border-radius: 100%;
            position: relative;

            .body, .head {
                position: absolute;
                background-color: var(--grey-inset-background-light);
                border: 1px solid var(--grey-borders);
                aspect-ratio: 1 / 1;
                border-radius: 100%;
                left: 50%;
                transform: translateX(-50%);
            }

            .body {
                top: 60%;
                height: 80%;
            }

            .head {
                top: 20%;
                height: 40%;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            grid-row-gap: var(--spacing-4);
            padding-top: var(--spacing-4);

            .line-1,
            .line-2 {
                background-color: var(--grey-inset-background);
                border: 1px solid var(--grey-borders);
                border-radius: var(--border-radius-1);
            }

            .line-1 {
                width: 100%;
                height: 40px;
            }

            .line-2 {
                width: 80%;
                height: 30px;
            }
        }
    }
</style>