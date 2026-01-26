<script lang="ts">
	import Button from '$cmsComponents/atoms/button.svelte';
	import ListItem from '$cmsComponents/molecules/listItem.svelte';
	import DataList from '$cmsComponents/organisms/dataList.svelte';
	import PageToolbar from '$cmsComponents/organisms/pageToolbar.svelte';
	import { Plus } from '@lucide/svelte';
	import type { ActionData, PageData } from './$types';
	import type { IDataListKeyValuePair } from '$cmsComponents/organisms/dataList.svelte';

	let { data }: { data: PageData; form: ActionData | undefined } = $props();
</script>

<main>
	<DataList itemNamePlural="Uploads" itemCount={data.uploads.length}>
		{#each data.uploads as uItem}
			{@const url = uItem.document ? uItem.document.url : uItem.image ? uItem.image.url : undefined}
			{@const keyValuePairs: IDataListKeyValuePair[] = [
                { key: 'title', value: uItem.title },
                { key: 'type', value: uItem.fileType },
                { key: 'url', value: url ?? 'no url'  }
            ]}

			<ListItem displayKeyValuePairs={keyValuePairs} id={uItem.id} />
		{/each}
	</DataList>
</main>
