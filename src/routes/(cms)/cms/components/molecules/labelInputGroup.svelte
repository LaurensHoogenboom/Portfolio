<script lang="ts">
	import Button from "$cmsComponents/atoms/button.svelte";
	import Instruction from "$cmsComponents/atoms/instruction.svelte";

    export interface ISelectOption {
        title: string,
        value: string
    }

    let { name, type, value = $bindable(), label, max, callback, required = false, instruction, selectOptions, acceptFile }:{ 
        name: string, 
        type: "text" | "textarea" | "password" | "select" | "file",
        value?: string | File | null,
        label: string,
        max?: number,
        callback?: () => void,
        required?: boolean,
        instruction?: string,
        selectOptions?: ISelectOption[],
        acceptFile?: string
    } = $props();

    $effect(() => {
        if (files instanceof FileList && files.length > 0) {
            value = files[0];
            fileName = files[0].name;

            if (acceptFile == 'image/*') {
                const reader = new FileReader();

                reader.addEventListener('load', () => {
                    if (typeof reader.result == "string") {
                        imagePreviewSrc = reader.result;
                    }
                });

                reader.readAsDataURL(value);
            }
        }
    });

    let files: FileList | undefined = $state();
    let fileName: string | undefined = $state(typeof value == "string" ? value.split('/').pop() : '');
    
    let showImage = $state(acceptFile == "image/*");
    let imagePreviewSrc = $state(typeof value == "string" ? value : '');
</script>

<div class="label-input-group">
    <label for={name}>{label}</label>

    {#if type == "text" || type == "password" }
        <input id={name} class="inset" type={type} name={name} bind:value={value} onchange={callback} max={max} {required}/>
    {:else if type == "textarea"}
        <textarea rows="5" class="inset" bind:value={value} name={name} onchange={callback} maxlength={max} {required}></textarea>
    {:else if type == "select"}
        <select class="clickable-input" id={name} name={name} onchange={callback} {required} bind:value={value}>
            {#if selectOptions}
                {#each selectOptions as option}
                    <option value={option.value}>{option.title}</option>
                {/each}
            {/if}            
        </select>
    {:else if type = "file"}
        <div class="file-input">
            <input id={name} type="file" name={name} bind:files={files} {required} accept={acceptFile}>
            <Button type="label" labelFor={name} style="secondary" title={value ? 'Change File' : 'Select File'} alignment="center" />

            {#if fileName}
                {#if showImage}
                    <img class="outset" alt={fileName} src={imagePreviewSrc}/>
                {:else}
                    <p>{fileName}</p>
                {/if}
            {/if}
        </div>
    {/if}

    {#if instruction && !value}
        <Instruction message={instruction} />
    {/if}
</div>

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

    .file-input {
        display: flex;
        flex-direction: column;
        grid-row-gap: var(--padding-3);

        input[type="file"] {
            opacity: 0;
            width: 0.1px;
            height: 0.1px;
            position: absolute;
        }

        img {
            width: 100%;
            max-width: 370px;
            border-radius: var(--border-radius-s);
            object-fit: cover;
        }
    }
</style>


