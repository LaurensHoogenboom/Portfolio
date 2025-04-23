<script lang="ts">
    let { name, type, value = $bindable(), label, max, callback, required = false }:{ 
        name: string, 
        type: "text" | "textarea" | "password",
        value?: string | null,
        label: string,
        max?: number,
        callback?: () => void,
        required?: boolean
    } = $props();
</script>

<style>
    .label-input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: var(--padding-3);
    }
</style>

<div class="label-input-group">
    <label for={name}>{label}</label>

    {#if type == "text" || type == "password" }
        <input class="inset" type={type} name={name} bind:value={value} onchange={callback} max={max} {required}/>
    {:else if type == "textarea"}
        <textarea class="inset" bind:value={value} name={name} onchange={callback} maxlength={max} {required}></textarea>
    {/if}
</div>


