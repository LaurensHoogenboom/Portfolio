<script lang="ts">
	import { ChevronDown, LogOut } from '@lucide/svelte';
	import CustomIcon from '../atoms/customIcons/customIcon.svelte';
	import Button from '../atoms/button.svelte';
	import { enhance } from '$app/forms';

	const { username, userImageUrl }: {
		username: string;
		userImageUrl?: string;
	} = $props();

	let userDropDownOpen = $state(false);
	let submitting = $state(false);
</script>

<div class="user-actions">
	<span class="ornament">
		<CustomIcon icon="feather" size={80} color="var(--grey-background-1)" />
	</span>

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="dropdown {userDropDownOpen ? 'active' : ''}"
		onclick={() => (userDropDownOpen = !userDropDownOpen)}
	>
		<p>{username}</p>
		<div class="inset avatar">
			<div class="outset"></div>
		</div>
		<ChevronDown size={18} class="dropdown-chevron" />

		{#if userDropDownOpen || submitting}
			<div class="content">
				<form method="post"	action="/login?/logout"	use:enhance>
					<Button
						type="submit"
						style="transparent"
						title="Logout"
						onclick={() => (submitting = !submitting)}
						icon={LogOut}
					/>
				</form>
			</div>
		{/if}
	</div>
</div>

<style>
	.user-actions {
		display: flex;
		align-items: center;
		height: 100%;
		background-color: var(--grey-background-1);
		position: relative;
		padding-left: var(--padding-3);
		grid-gap: var(--padding-2);

		&:after {
			position: absolute;
			content: '';
			top: 0;
			bottom: 0;
			background-color: var(--grey-background-1);
			width: 100vw;
			z-index: 0;
		}

		.dropdown {
			display: flex;
			flex-direction: row;
			align-items: center;
			grid-gap: var(--padding-4);
			border-radius: var(--border-radius-s);
			padding: var(--padding-5) var(--padding-4);
			cursor: pointer;
			position: relative;
			border: 1px solid transparent;

			p {
				padding: 0;
			}

			.avatar {
				height: 40px;
				width: 40px;
				border-radius: 100%;

				.outset {
					border-radius: 100%;
				}
			}

			&.active {
				background-color: var(--grey-background-2);
				border: var(--default-border);
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}

			.content {
				top: 100%;
				left: 0;
				right: 0;
				position: absolute;
				padding: var(--padding-4) var(--padding-5);
				background-color: var(--white-background);
				box-shadow: var(--shadow-float-1);
				border: var(--default-border);
				border-bottom-left-radius: var(--border-radius-s);
				border-bottom-right-radius: var(--border-radius-s);
			}

			@media (hover: hover) {
				&:hover {
					background-color: var(--grey-background-2);
				}
			}
		}

		.ornament {
			display: flex;
			align-items: center;
			height: 100%;
			position: absolute;
			left: 0;
			rotate: 180deg;
			transform: translateX(46%);
			overflow: hidden;
		}

		* {
			z-index: 1;
		}
	}
</style>
