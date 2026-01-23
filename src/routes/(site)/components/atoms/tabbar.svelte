<script lang="ts">
	import { ChevronLeft, ChevronRight, type Icon as IconType } from '@lucide/svelte';
	import Button from './button.svelte';
	import { onMount } from 'svelte';

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

	let tabbar: HTMLUListElement;
	let selectedLeft = $state(7);
	let selectedWidth = $state(0);
	let styleString = $derived(`--selected-width: ${selectedWidth}px; --selected-left: ${selectedLeft}px;`);
	let previousButtonVisible = $state(false);
	let nextButtonVisible = $state(false);

	onMount(() => updateTabbarUi(selectedIndex));
	$effect(() => updateTabbarUi(selectedIndex));

	const updateTabbarUi = (index: number) => {
		toggleNavigationButtonVisibility(index);

		setTimeout(() => {
			scrollToCurrentTab(index);
		}, 5);

		setTimeout(() => {
			setAfterElement(index);
		}, 5);
	};

	const changeSelection = (index: number) => {
		if (onSelectionChange) onSelectionChange(index);
	};

	const setAfterElement = (index: number) => {
		if (!tabbar) return;

		const listItems = tabbar.querySelectorAll('li');
		const selectedListItem = listItems[index];

		selectedLeft = selectedListItem.offsetLeft;
		selectedWidth = selectedListItem.offsetWidth;
	};

	const toggleNavigationButtonVisibility = (index: number) => {
		if (style != 'pil') return;

		const overflow = tabbar.scrollWidth - tabbar.clientWidth;

		if (overflow < 5) {
			previousButtonVisible = false;
			nextButtonVisible = false;
			return;
		}

		switch (true) {
			case index == 0:
				previousButtonVisible = false;
				nextButtonVisible = true;
				break;
			case index > 0 && index < tabItems.length - 1:
				previousButtonVisible = true;
				nextButtonVisible = true;
				break;
			case index == tabItems.length - 1:
				previousButtonVisible = true;
				nextButtonVisible = false;
				break;
			default:
				break;
		}
	};

	const scrollToCurrentTab = (index: number) => {
		const listItems = tabbar.querySelectorAll('li');
		const selectedListItem = listItems[index];
		tabbar.scrollTo({ left: selectedListItem.offsetLeft - tabbar.offsetLeft - 35, behavior: 'smooth' });
	};
</script>

<svelte:window onresize={() => updateTabbarUi(selectedIndex)} />

<ul class="tab-bar {CSSClass} {style}" bind:this={tabbar} style={styleString}>
	{#if style == 'pil' && previousButtonVisible}
		<Button
			type="submit"
			style="transparent"
			icon={ChevronLeft}
			CSSClass="button-previous"
			onclick={() => changeSelection(selectedIndex - 1)}
		/>
	{/if}

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

	{#if style == 'pil' && nextButtonVisible}
		<Button
			type="submit"
			style="transparent"
			icon={ChevronRight}
			CSSClass="button-next"
			onclick={() => changeSelection(selectedIndex + 1)}
		/>
	{/if}
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
						padding: 0 var(--spacing-3);

						.alternate-icon {
							display: flex;
							align-items: center;
							padding-bottom: 2px;
						}

						.text {
							display: none;
						}
					}

					@media (hover: hover) and (pointer: fine) {
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
			max-width: calc(100vw - var(--vertical-spacing) * 2);
			overflow: hidden;

			.tab-item button {
				height: 38px;
				line-height: 35px;
				padding: 0 var(--spacing-3);

				@media (max-width: 420px) {
					height: 35px;
					line-height: 30px;

					span {
						font-size: 16px;
					}
				}
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

			@media (max-width: 420px) {
				&:after {
					height: 35px;
				}
			}

			:global(.button-previous, .button-next) {
				height: 50px;
				width: 50px;
				border: none;
				position: sticky;
				background-color: var(--primary-base);
				z-index: 2;
				margin-top: calc(0px - var(--spacing-1));
				margin-bottom: calc(0px - var(--spacing-1));
			}

			:global(.button-previous) {
				left: calc(0px - var(--spacing-1));
				border-radius: var(--border-radius-3) 0 0 var(--border-radius-3);
				margin-right: 0;
			}

			:global(.button-next) {
				right: calc(0px - var(--spacing-1));
				border-radius: 0 var(--border-radius-3) var(--border-radius-3) 0;
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
