<script lang="ts">
	import { page } from '$app/state';
	import LabelInputGroup from '$cmsComponents/molecules/labelInputGroup.svelte';
	import { updatePageParams } from '$lib/utils/updatePageParams';
	import { Search } from '@lucide/svelte';

	let searchTimer: NodeJS.Timeout;
	let value = page.url.searchParams.get('searchString');

	const search = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			updatePageParams({ searchString: value });
		}, 300);
	};
</script>

<LabelInputGroup
	type="text"
	label="Search"
	labelPosition="placeholder"
	name="searchText"
	layout="horizontal"
	callback={search}
	callbackEvent="oninput"
	icon={Search}
	{value}
/>
