<script lang="ts">
    const { style } : { style?: string } = $props();
</script>

<div class="outer" style={style}>
    <div class="inner"></div>
</div>

<style>
    .outer {
        position: absolute;
        height: 52px;
        width: 23px;
        border: 1px solid var(--white);
        border-radius: 12px;
        padding: 6px
    }

    .inner {
        height: 18px;
        width: 10px;
        background-color: var(--white);
        border-radius: 5px;
        animation: slide-down 3s infinite ease-in-out;
    }

    @keyframes slide-down {
        0% {transform: translateY(0%);}
        90% {transform: translateY(100%);}
        100% {transform: translateY(0%);}
    }
</style>