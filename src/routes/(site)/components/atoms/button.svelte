<script lang="ts">
	import { type Icon as IconType } from '@lucide/svelte';

	const {
		title,
		icon,
		type,
		style = 'primary',
		href,
		onclick,
		CSSClass,
		id,
		disabled
	}: {
		title?: string;
		icon?: typeof IconType;
		type: 'goto' | 'goto-external' | 'submit';
		style?: 'primary' | 'secondary' | 'transparent' | 'inline';
		href?: string;
		onclick?: () => void;
		CSSClass?: string;
		id?: string;
		disabled?: boolean
	} = $props();

	const classString = `button ${style} ${title ?? 'round'} ${CSSClass} ${disabled ? 'disabled' : ''}`;

	const gotoOnClick = (e: MouseEvent) => {
		if (type == 'goto-external') return;

		if (href?.startsWith('#')) {
			const hash = href.split('#')[1];

			if (!hash) return;

			e.preventDefault();
			document.getElementById(hash)?.scrollIntoView({behavior: 'smooth'});
		}
	}
</script>

{#if type == 'submit'}
	<button {onclick} class={classString} id={id}>
		{@render buttonContent()}
	</button>
{/if}

{#if type == 'goto' || type == 'goto-external'}
	<a {href} class={classString} target={type == 'goto-external' ? '_blank' : '_self'} id={id} onclick={gotoOnClick}>
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
		border: 1px solid var(--primary-base);
		transition:
			background-color var(--default-animation-duration),
			opacity var(--default-animation-duration);
		--hover-background-color: var(--primary-background-solid);

		&:not(.inline) {
			padding: 0 var(--spacing-4);
			border-radius: var(--border-radius-1);
			height: 45px;

			&:not(:last-of-type) {
				margin-right: var(--spacing-3);
			}
		}

		&:not(.inline, .transparent) {
			box-shadow: var(--primary-shadow);
		}

		&.round {
			aspect-ratio: 1 / 1;
			padding: 0;
			justify-content: center;
			border-radius: 100%;
		}

		&.primary {
			background-color: var(--primary-base);
			color: var(--white);
		}

		&.secondary {
			border: 1px solid var(--primary-base);
			color: var(--primary-base);
			background-color: var(--white);
		}

		&.transparent {
			border: 1px solid var(--grey-borders);
			background: none;
		}

		&.inline {
			height: auto;

			@media (hover:hover) {
				&:hover:not(.disabled) {
					opacity: 0.6;
				}
			}
		}

		&.disabled {
			cursor: default;
			opacity: 0.5;
		}

		@media (hover: hover) {
			&:hover:not(.inline, .disabled) {
				background-color: var(--hover-background-color);
				color: var(--white);
				cursor: pointer;
			}
		}
	}

	:global(.section-dark) .button {
		&.primary {
			background-color: var(--white);
			color: var(--primary-base);
			--hover-background-color: var(--grey-inset-background);
		}

		&.secondary {
			background-color: var(--primary-background-solid);
			border-color: var(--primary-borders);
			color: var(--white);
			--hover-background-color: var(--primary-base);
		}

		&.transparent {
			border-color: var(--primary-borders);
			--hover-background-color: var(--primary-background-solid);
		}

		@media (hover: hover) {
			&:hover:not(.inline, .disabled) {
				background-color: var(--hover-background-color);
				cursor: pointer;
			}
		}
	}
</style>
