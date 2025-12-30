<script lang="ts">
	import { type Icon as IconType } from '@lucide/svelte';

	const {
		title,
		icon,
		type,
		style = "primary",
		href,
		onclick
	}: {
		title?: string;
		icon?: typeof IconType;
		type: 'goto' | 'submit';
		style?: 'primary' | 'secondary' | 'transparent' | 'inline';
		href?: string;
		onclick?: () => void;
	} = $props();
</script>

{#if type == 'submit'}
    <button onclick={onclick} class="button {style}">
        {@render buttonContent()}
    </button>
{/if}

{#if type == 'goto'}
	<a href={href} class="button {style}"> 
        {@render buttonContent()}
    </a>
{/if}

{#snippet buttonContent()}
    {#if icon}
        {@const ButtonIcon = icon}
        <ButtonIcon size={22} />
    {/if}
    {#if title}
        <span>
            {title}
        </span>
    {/if}
{/snippet}

<style>
    .button {
        text-decoration: none;
        display: inline-flex;
        grid-gap: 15px;
        align-items: center;

        &:not(.inline) {
            padding: 0 var(--spacing-4);
            border-radius: var(--border-radius-1);
            height: 45px;

            &:not(:last-of-type) {
                margin-right: var(--spacing-4);
            }
        }

        &.primary {
            background-color: var(--primary-base);
            color: var(--white);
        }

        &.secondary {
            border: 1px solid var(--primary-base);
            color: var(--primary-base);
        }

        &.inline {
            height: auto;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    :global(.section-dark) .button {
        &.primary {
            background-color: var(--white);
            color: var(--primary-base);
        }

        &.secondary {
            background-color: var(--primary-background-solid);
            border-color: var(--primary-borders);
            color: var(--white);
        }
    }
</style>
