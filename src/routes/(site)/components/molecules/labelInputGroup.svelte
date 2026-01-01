<script lang="ts">
    const { type, name, label, required = false } : { type: "text" | "email" | "textarea", name: string, label: string, required?:boolean } = $props();
</script>

<div class="label-input-group {type == "textarea" ? 'span' : ''}">
    <label for={name}>{label}</label>

    {#if type=='email' || type == 'text'}
        <input type={type} id={name} name={name} {required}/>
    {:else}
        <textarea id="name" name={name} rows="6" {required}></textarea>
    {/if}
</div>

<style>
    .label-input-group {
        display: flex;
        flex-direction: column;
        grid-gap: var(--spacing-2);

        &.span {
            grid-column: 1 / -1;
        }

        input, textarea {
            border-radius: var(--border-radius-1);
            border: 1px solid var(--grey-borders);
            background-color: var(--grey-inset-background-light);
            padding: var(--spacing-2) var(--spacing-3);

            &:focus {
                border-color: var(--primary-base);
                outline: none;
                box-shadow: var(--primary-shadow);
            }
        }

        input {
            height: 45px;
        }

        textarea {
            resize: vertical;
        }

        label {
            padding-left: var(--spacing-1);

            &:has(+ :focus) {
                color: var(--primary-base);
            }
        }
    }
</style>