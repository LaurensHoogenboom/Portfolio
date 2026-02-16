<script lang="ts">
	import { Check, InfoIcon, TriangleAlert, X } from '@lucide/svelte';
	import { globalNotifications } from '../../shared/globalNotifications.svelte';
	import { fly, slide } from 'svelte/transition';
	import Button from '$cmsComponents/atoms/button.svelte';

	$effect(() => {
		globalNotifications.notifications.forEach((n) => {
			if (n.visible !== false) {
				setTimeout(() => {
					n.visible = false;
				}, n.duration ?? 3000);
			}
		});
	});

	function getColor(type: 'information' | 'warning' | 'succes' | undefined) {
		switch (type) {
			case 'information':
				return 'blue';
			case 'warning':
				return 'red';
			case 'succes':
				return 'green';
			default:
				return '';
		}
	}

	const hideNotification = (id: string) => {
		globalNotifications.notifications.forEach((n) => {
			if (n.id == id) {
				n.visible = false;
			}
		});
	};
</script>

<div class="notification-container">
	{#each globalNotifications.notifications as n}
		{#if n.visible !== false}
			<div class="notification frost-glass white {n.type ? n.type : null}" in:fly|global={{ y: 20, delay: 300 }} out:slide|global>
				<div class="inset round icon-container {getColor(n.type)}">
					<div class="outset">
						{#if n.type == 'succes'}
							<Check size={16} strokeWidth={4} />
						{:else if n.type == 'warning'}
							<TriangleAlert size={16} strokeWidth={4} />
						{:else}
							<InfoIcon size={16} strokeWidth={4} />
						{/if}
					</div>
				</div>
				{#if n.title}
					<p style={n.type ? `color: var(--${getColor(n.type)}-dark);` : ''}><strong>{n.title}</strong></p>
				{/if}
				<p style="{!n.title ? 'grid-row: 1 / 3;' : ''} {n.type ? `color: var(--${getColor(n.type)}-dark);` : ''}">{n.message}</p>
				<Button type="button" icon={X} style="transparent" CSSClass="close-button" onclick={() => hideNotification(n.id)} />
			</div>
		{/if}
	{/each}
</div>

<style>
	.notification-container {
		top: 100%;
		right: 0;
		position: absolute;
		z-index: 5;
		padding-top: var(--padding-4);

		.notification {
			display: grid;
			grid-template-columns: 39px minmax(0, 1fr);
			min-width: 350px;
			border: var(--default-border);
			padding: var(--padding-3) var(--padding-3) var(--padding-3) var(--padding-2);
			border-radius: var(--border-radius-m);
			grid-column-gap: var(--padding-2);
			grid-row-gap: 3px;
			align-items: center;
			box-shadow: var(--shadow-float-2);
			margin-bottom: var(--padding-4);

			.icon-container {
				grid-row: 1 / 3;
				grid-column: 1 / 2;
				height: 39px;
				padding: var(--padding-7);
			}

			p {
				padding-bottom: 0;

				&:not(:last-of-type):first-of-type {
					align-self: flex-end;
				}

				&:not(:first-of-type):last-of-type {
					align-self: flex-start;
				}
			}

			:global(.close-button) {
				grid-row: 1 / 3;

				:global(svg) {
					height: 18px;
					width: 18px;
				}
			}
		}
	}
</style>