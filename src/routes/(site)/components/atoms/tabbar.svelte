<script lang="ts">
	import { onMount } from 'svelte';
	import { type Icon as IconType } from '@lucide/svelte';

	export interface ITabItem {
		title: string;
		alternateIcon?: typeof IconType;
	}

	const {
		tabItems,
		selectedIndex = 0,
		onSelectionChange,
		CSSClass,
		style = 'pil'
	}: {
		tabItems: ITabItem[];
		selectedIndex?: number;
		onSelectionChange?: (index: number) => void;
		CSSClass?: string;
		style?: 'pil' | 'tabs';
	} = $props();

	let selectedLeft = $state(7);
	let selectedWidth = $state(0);
	let tabbar: HTMLUListElement;

	const changeSelection = (index: number) => {
		if (onSelectionChange) onSelectionChange(index);
		setAfterElement(index);
	};

	const setAfterElement = (index: number) => {
		if (!tabbar) return;

		const listItems = tabbar.querySelectorAll('li');
		const selectedListItem = listItems[index];

		selectedLeft = selectedListItem.offsetLeft;
		selectedWidth = selectedListItem.offsetWidth;
	};

	onMount(() => setAfterElement(selectedIndex));
</script>

<ul class="tab-bar {CSSClass} {style}" bind:this={tabbar} style="--selected-width: {selectedWidth}px; --selected-left: {selectedLeft}px;">
	{#each tabItems as item, i}
		{@const selected = i == selectedIndex}

		<li class="tab-item {selected ? 'selected' : ''}">
			<button onclick={() => changeSelection(i)}>
				<span class="text">
					{item.title}
				</span>

				{#if item.alternateIcon}
					{@const Icon = item.alternateIcon}
					<div class="alternate-icon">
						<Icon strokeWidth={selected ? 2.5 : 2} />
					</div>
				{/if}
			</button>
		</li>
	{/each}
</ul>

<style>
	.tab-bar {
		display: inline-grid;
		grid-auto-flow: column;
		list-style: none;
		position: relative;
		padding-bottom: 0;

		.tab-item {
			padding-bottom: 0;
			max-width: initial;

			button {
				white-space: nowrap;
				color: var(--grey-text);
				background: none;
				border: none;
				position: relative;
				z-index: 1;
				cursor: pointer;

				.alternate-icon {
					display: none;
				}
			}
		}

		&.tabs {
			grid-gap: 10px;
			transition: grid-gap var(--default-animation-duration);

			.tab-item {
				button {
					height: 45px;
					background-color: var(--white);
					box-shadow: var(--grey-shadow-1);
					padding: 0 var(--spacing-4);
					color: var(--primary-base);
					transition: padding var(--default-animation-duration);

					@media (max-width: 1180px) {
						.alternate-icon {
							display: flex;
							align-items: center;
							padding-bottom: 2px;
						}

						.text {
							display: none;
						}
					}

					@media (hover: hover) {
						&:hover {
							background-color: var(--grey-inset-background-light);
						}
					}
				}

				:global(&.selected) button {
					font-weight: bold;
					animation: click 0.2s;

					@media (max-width: 1180px) {
						position: relative;

						&:after {
							content: '';
							height: 2px;
							background-color: var(--primary-base);
							left: 50%;
							transform: translateX(-50%);
							width: 40px;
							bottom: 3px;
							display: block;
							position: absolute;
						}
					}
				}
			}
		}

		&.pil {
			background-color: var(--grey-inset-background);
			padding: var(--spacing-1);
			border-radius: 200px;
			border: 1px solid var(--grey-borders);

			.tab-item button {
				height: 38px;
				line-height: 35px;
				padding: 0 var(--spacing-3);
			}

			&:after {
				content: '';
				display: block;
				position: absolute;
				height: 38px;
				border: 1px solid var(--grey-borders);
				border-radius: 200px;
				background-color: var(--white);
				top: 7px;
				left: var(--selected-left);
				width: var(--selected-width);
				transition:
					left var(--default-animation-duration),
					width var(--default-animation-duration);
			}
		}
	}

	@keyframes click {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
