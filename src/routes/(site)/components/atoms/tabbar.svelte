<script lang="ts">
	import { onMount } from 'svelte';

	export interface ITabItem {
		title: string;
	}

	const {
		tabItems,
		selectedIndex = 0,
		onSelectionChange,
		CSSClass,
		style = 'pil'
	}: { tabItems: ITabItem[]; selectedIndex?: number; onSelectionChange?: (index: number) => void; CSSClass?: string; style?: 'pil' | 'tabs' } = $props();

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
	}

	onMount(() => setAfterElement(selectedIndex));
</script>

<ul class="tab-bar {CSSClass} {style}" bind:this={tabbar} style="--selected-width: {selectedWidth}px; --selected-left: {selectedLeft}px;">
	{#each tabItems as item, i}
		<li class="tab-item {i == selectedIndex ? 'selected' : ''}">
			<button onclick={() => changeSelection(i)}>
				{item.title}
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

		.tab-item button {
			white-space: nowrap;
			color: var(--grey-text);
			background: none;
			border: none;
			position: relative;
			z-index: 1;
			cursor: pointer;
		}

		&.tabs {
			grid-gap: 10px;

			.tab-item {
				button {
					height: 45px;
					background-color: var(--white);
					box-shadow: var(--grey-shadow-1);
					padding: 0 var(--spacing-4);
					color: var(--primary-base);
				}

				:global(&.selected) button {
					font-weight: bold;
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
</style>
