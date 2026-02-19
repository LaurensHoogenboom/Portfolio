<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { page } from '$app/state';
	import { updatePageParams } from '$lib/utils/updatePageParams';
	import type { ISelectOption } from '$cmsComponents/atoms/inputs/select.svelte';

	const { totalItemCount, style }: { totalItemCount: number; style?: "default" | "transparent"; } = $props();

	interface IPaginationStatus {
		activePageIndex: number;
		pageCount: number;
		itemsPerPage: number;
	}

	const pageSizeOptions: ISelectOption[] = [
		{ title: '20', value: 20 },
		{ title: '50', value: 50 },
		{ title: '100', value: 100 }
	];

	const setPage = (index: number) => updatePageParams({ pageIndex: index });
	const setPageSize = (itemCount: number) => updatePageParams({ itemsPerPage: itemCount }, true);

	const paginationStatus: IPaginationStatus = $derived({
		activePageIndex: parseInt(page.url.searchParams.get('pageIndex') ?? '0'),
		pageCount: Math.ceil(totalItemCount / parseInt(page.url.searchParams.get('itemsPerPage') ?? pageSizeOptions[0].title)),
		itemsPerPage: parseInt(page.url.searchParams.get('itemsPerPage') ?? pageSizeOptions[0].title)
	});
</script>

<div class="data-list-footer {style == 'default' ? 'box' : ''}">
	<div class="inset page-controls">
		{#if paginationStatus.activePageIndex > 0}
			<div class="outset">
				<Button style="transparent" type="button" icon={ArrowLeft} onclick={() => setPage(paginationStatus.activePageIndex - 1)} />
			</div>
		{/if}

		{#key paginationStatus.activePageIndex}
			<div class="outset page-list">
				{#each { length: paginationStatus.pageCount }, i}
					<Button
						style="transparent"
						type="button"
						title={(i + 1).toString()}
						CSSClass={i == paginationStatus.activePageIndex ? 'current' : undefined}
						onclick={() => setPage(i)}
					/>
				{/each}
			</div>
		{/key}

		{#if paginationStatus.activePageIndex < paginationStatus.pageCount - 1}
			<div class="outset">
				<Button style="transparent" type="button" icon={ArrowRight} onclick={() => setPage(paginationStatus.activePageIndex + 1)} />
			</div>
		{/if}
	</div>
	<div>
		<LabelInputGroup
			type="select"
			name="pageSize"
			label="Items per page"
			layout="horizontal"
			selectOptions={pageSizeOptions}
			callback={(e) => {
				const target = e.target as HTMLSelectElement;
				setPageSize(Number(target.value));
			}}
		/>
	</div>
</div>

<style>
	.data-list-footer {
		position: sticky;
		bottom: 0;
		z-index: 2;
		padding: var(--padding-4) var(--padding-3);
		align-items: center;
		display: flex;
		justify-content: space-between;

		.page-controls {
			display: grid;
			grid-auto-flow: column;
			grid-gap: var(--padding-4);

			.page-list {
				height: 30px;
				padding: 0 var(--padding-4);

				:global(.current span) {
					font-weight: bold;
				}
			}
		}
	}
</style>
