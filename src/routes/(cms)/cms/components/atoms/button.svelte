<script lang="ts">
    import { type Snippet } from 'svelte';
    import { Check, type Icon as IconType } from '@lucide/svelte'; 
    import { Circle } from 'svelte-loading-spinners';
    import { fly } from 'svelte/transition';

    const { title, type, style, alignment, url, onclick, icon, children, loading = false, form, succes = false, labelFor, iconPosition = 'right', CSSClass, primaryColor = 'default' } : {
        title?: string,
        type: "submit" | "button" | "goto" | "label",
        style: "primary" | "secondary" | "transparent" | "inset-outset",
        alignment?: "default" | "center",
        url?: string,
        onclick?: () => void,
        icon?: typeof IconType,
        children?: Snippet,
        loading?: boolean,
        form?: string,
        succes?: boolean,
        labelFor?: string,
        iconPosition?: 'left' | 'right',
        CSSClass?: string,
        primaryColor?: 'default' | 'red'
    } = $props();

    const classString = `${style == "inset-outset" ? "inset round" : `clickable-input ${style} ${CSSClass} ${primaryColor}`}`;
</script>

{#if type == "goto" && url}
    <a class={classString} href="{url}">
        {@render buttonContentWrapper()}
    </a>
{:else if type == "button" || type == "submit"}
    <button class={classString} type={type} onclick={onclick} form={form}>
        {@render buttonContentWrapper()}
    </button>
{:else if type == "label"}
    <label style="display: inline-block;" class={classString} for={labelFor} >
        {@render buttonContentWrapper()}
    </label>
{/if}

{#snippet buttonContentWrapper()}
    {#if style=="inset-outset"}
        <div class="outset">
            {@render buttonContent()}
        </div>
    {:else}
        {@render buttonContent()}
    {/if}
{/snippet}

{#snippet buttonContent()}
    <div class="button-content 
        {alignment}-alignment 
        {icon ? "has-icon" : ""} 
        {!title && !children ? "only-icon same-height-as-width" : ""} 
        {(loading || succes) ? "hidden" : ""}
        icon-{iconPosition}
    ">
        {#if children}
            {@render children()}
        {:else}
            {#if title}
                <span>
                    {title}
                </span>
            {/if}
            {#if icon}
                {@const ButtonIcon = icon}
                <ButtonIcon size={16} />
            {/if}
        {/if}
    </div>

    {#if loading}
        <div class="button-content overlay" transition:fly={{ y: 20 }}>
            <Circle size={17} color={style=="primary" ? "var(--white-text)" : 'var(--grey-text-2)'}/>
        </div> 
    {/if}

    {#if succes}
        <div class="button-content overlay has-icon only-icon" transition:fly={{ y: 20 }}>
            <Check size={18} />
        </div>
    {/if}
{/snippet}