<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import LabelInputGroup, { type ISelectOption } from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';

	export interface IPaginationStatus {
		activePageIndex: number;
		pageCount: number;
		itemsPerPage: number;
	}

	const pageSizeOptions: ISelectOption[] = [
		{ title: '10', value: 10 },
		{ title: '20', value: 20 },
		{ title: '50', value: 50 }
	];

	const {
		setPage,
		setPageSize,
		paginationStatus
	}: {
		setPage: (index: number) => void;
		setPageSize: (itemCount: number) => void;
		paginationStatus: IPaginationStatus;
	} = $props();
</script>

<div class="box data-list-footer">
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
