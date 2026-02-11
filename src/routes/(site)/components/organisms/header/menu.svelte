<script lang="ts">
	import { Folder, IdCard, Mail, type Icon as IconType } from '@lucide/svelte';
	import Button from '$siteComponents/atoms/button.svelte';
	import { onMount } from 'svelte';

	interface NavItem {
		title: string;
		href: string;
		icon: typeof IconType;
	}

	const navItems: NavItem[] = [
		{ title: 'Over', href: '#about', icon: IdCard },
		{ title: 'Portfolio', href: '#portfolio', icon: Folder },
		{ title: 'Contact', href: '#contact', icon: Mail }
	];

	let expanded = $state(false);
	let navigateFromResponsiveNav = $state(false);
	const closeMenu = () => (expanded = false);

	$effect(() => {
		if (expanded) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	});

	onMount(() => {
		window.addEventListener('resize', () => {
			navigateFromResponsiveNav = window.innerWidth < 1180;
		});
	});
</script>

<button class="expand-button" aria-label="navigatie" onclick={() => (expanded = !expanded)}>
	<div class="hamburger {expanded ? 'expanded' : ''}">
		<span></span>
		<span></span>
		<span></span>
	</div>
</button>

<div class="nav-items {expanded ? 'expanded' : ''}">
	{#each navItems as n}
		{@const icon = n.icon}
		<Button type="goto" href={n.href} title={n.title} {icon} style="inline" onclick={closeMenu} {navigateFromResponsiveNav} />
	{/each}
</div>

<style>
	.expand-button {
		display: none;

		.hamburger {
			span {
				display: block;
				height: 2px;
				width: 30px;
				background-color: var(--white);
				transition:
					transform var(--default-animation-duration),
					opacity var(--default-animation-duration);

				&:not(:last-child) {
					margin-bottom: 10px;
				}
			}

			&.expanded span {
				&:first-child {
					transform: translateY(12px) rotate(135deg);
				}

				&:nth-child(2) {
					opacity: 0;
					transform: translateX(-100%);
				}

				&:last-child {
					transform: translateY(-12px) rotate(-135deg);
				}
			}
		}

		@media (max-width: 1180px) {
			display: block;
			height: 45px;
			width: 45px;
			background: none;
			border: none;
		}

		@media (max-width: 680px) {
			grid-row-start: 1;
			grid-column-start: 3;
		}
	}

	.nav-items {
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		grid-gap: 30px;

		@media (max-width: 1180px) {
			display: grid;
			grid-auto-flow: row;
			padding-bottom: 0;
			grid-gap: 0;
			overflow: hidden;
			height: 0;
			opacity: 0;
			grid-column: 1 / -1;
			pointer-events: none;
			transition:
				height var(--default-animation-duration),
				opacity var(--default-animation-duration),
				padding var(--default-animation-duration);

			&.expanded {
				height: auto;
				opacity: 1;
				pointer-events: all;
				padding-bottom: var(--spacing-7);
			}

			:global(.button) {
				width: 100%;
				padding-top: var(--spacing-3);
				padding-bottom: var(--spacing-3);
				border-bottom: 1px solid var(--primary-borders);
				padding-left: var(--spacing-3);

				&:first-child {
					border-top: 1px solid var(--primary-borders);
				}
			}
		}

		@media (max-width: 680px) {
			grid-row: 2 / -1;
		}
	}
</style>
