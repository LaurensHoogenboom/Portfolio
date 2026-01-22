<script lang="ts">
	import { Check, Triangle, type Icon as IconType } from '@lucide/svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { fly } from 'svelte/transition';

	export type ButtonActionStatus = 'processing' | 'success' | 'fail';

	const {
		title,
		icon,
		type,
		style = 'primary',
		href,
		onclick,
		CSSClass = '',
		id,
		disabled,
		actionStatus,
		size = 'normal',
		stretched,
		scrollContainer,
		navigateFromResponsiveNav
	}: {
		title?: string;
		icon?: typeof IconType;
		type: 'goto' | 'goto-external' | 'submit';
		style?: 'primary' | 'secondary' | 'transparent' | 'inline';
		href?: string;
		onclick?: () => void;
		CSSClass?: string;
		id?: string;
		disabled?: boolean;
		actionStatus?: ButtonActionStatus;
		size?: 'normal' | 'small';
		stretched?: boolean;
		scrollContainer?: HTMLElement;
		navigateFromResponsiveNav?: boolean;
	} = $props();

	const classString = `button ${style} ${title ?? 'round'} ${CSSClass} ${disabled ? 'disabled' : ''} ${size} ${stretched ? 'stretched' : ''}`;
	const iconSize = size == 'normal' ? 22 : 17;

	const gotoOnClick = (e: MouseEvent) => {
		if (type == 'goto-external') return;

		if (onclick) onclick();

		if (href?.startsWith('#')) {
			const hash = href.split('#')[1];
			if (!hash) return;

			e.preventDefault();

			const navCorrection = navigateFromResponsiveNav ? window.innerHeight - 30 : 0;
			const boundContainer = scrollContainer ? scrollContainer : window;
			const targetTop = document.getElementById(hash)?.getBoundingClientRect().top ?? 0;
			const scrollContainerTop = scrollContainer ? scrollContainer.scrollTop : document.documentElement.scrollTop;
			const scrollTop = scrollContainerTop + targetTop - 10 - navCorrection;
			boundContainer.scrollTo({ top: scrollTop, left: 0, behavior: 'smooth' });
		}
	};
</script>

{#if type == 'submit'}
	<button {onclick} class={classString} {id}>
		{@render buttonContent()}
	</button>
{/if}

{#if type == 'goto' || type == 'goto-external'}
	<a {href} class={classString} target={type == 'goto-external' ? '_blank' : '_self'} {id} onclick={gotoOnClick}>
		{@render buttonContent()}
	</a>
{/if}

{#snippet buttonContent()}
	{#if icon}
		{@const ButtonIcon = icon}
		<ButtonIcon size={iconSize} />
	{/if}
	{#if title}
		<span class="title">
			{@html title}
		</span>
	{/if}

	{#if actionStatus}
		{#if actionStatus == 'processing'}
			<div class="button-overlay" transition:fly|global={{ y: 20 }}>
				<Circle size={iconSize} color={style == 'primary' ? 'var(--white)' : 'var(--primary-base)'} />
			</div>
		{:else if actionStatus == 'success'}
			<div class="button-overlay" transition:fly|global={{ y: 20 }}>
				<Check size={iconSize} />
			</div>
		{:else if actionStatus == 'fail'}
			<div class="button-overlay" transition:fly|global={{ y: 20 }}>
				<Triangle size={iconSize} />
			</div>
		{/if}
	{/if}
{/snippet}
