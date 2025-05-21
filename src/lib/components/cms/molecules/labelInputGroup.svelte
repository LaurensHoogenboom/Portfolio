<script lang="ts">
	import Instruction from "../atoms/instruction.svelte";

    let { name, type, value = $bindable(), label, max, callback, required = false, instruction }:{ 
        name: string, 
        type: "text" | "textarea" | "password",
        value?: string | null,
        label: string,
        max?: number,
        callback?: () => void,
        required?: boolean,
        instruction?: string
    } = $props();
</script>

<style>
    .label-input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: var(--padding-3);

        :global(p) {
            margin-bottom: var(--padding-3);
            margin-top: var(--padding-3);
        }

        &:last-child :global(.instruction) {
            margin-bottom: 0;
        }
    }
</style>

<div class="label-input-group">
    <label for={name}>{label}</label>

    {#if type == "text" || type == "password" }
        <input id={name} class="inset" type={type} name={name} bind:value={value} onchange={callback} max={max} {required}/>
    {:else if type == "textarea"}
        <textarea class="inset" bind:value={value} name={name} onchange={callback} maxlength={max} {required}></textarea>
    {/if}

    {#if instruction && !value}
        <Instruction message={instruction} />
    {/if}
</div>


