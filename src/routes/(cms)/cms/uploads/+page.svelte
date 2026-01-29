<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import DataList from '$cmsComponents/dataList.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { ActionData, PageData } from './$types';
	import { uploadsTableUIConfig } from '$lib/configs/uploads';

	let { data }: { data: PageData; form: ActionData | undefined } = $props();
</script>

<PageToolbar>
	<Button type="button" style="primary" title="Add" icon={Plus} />
</PageToolbar>

<main>
	<DataList data={data.uploads} config={uploadsTableUIConfig} itemNamePlural="Uploads" deleteAction="?/delete" />
</main>
