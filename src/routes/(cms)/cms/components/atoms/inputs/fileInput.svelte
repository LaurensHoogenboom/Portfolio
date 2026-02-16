<script lang="ts">
	import Button from '../button.svelte';
	import { File as FileIcon } from '@lucide/svelte';

	let {
		name,
		required = false,
		acceptFile,
		value = $bindable(),
		setValidationWarning
	}: {
		name: string;
		required?: boolean;
		acceptFile?: string;
		value?: string | File | null;
		setValidationWarning: (message?: string) => void;
	} = $props();

	let files: FileList | undefined = $state();
	let fileName: string | undefined = $state(typeof value == 'string' ? value.split(/[\\/]/).pop() : '');

	let showImage = $state(acceptFile == 'image/*');
	let imagePreviewSrc = $state(typeof value == 'string' ? value : '');

	$effect(() => {
		if (files instanceof FileList && files.length > 0) {
			value = files[0];

			if (value.size > 20 * 1024 * 1024) {
				setValidationWarning('Files must be smaller than 20 MB.');
				fileName = undefined;
				return;
			}

			fileName = files[0].name;
			setValidationWarning(undefined);

			if (acceptFile == 'image/*') {
				const reader = new FileReader();

				reader.addEventListener('load', () => {
					if (typeof reader.result == 'string') {
						imagePreviewSrc = reader.result;
					}
				});

				reader.readAsDataURL(value);
			}
		}
	});
</script>

<div class="file-input">
	<input id={name} type="file" {name} bind:files {required} accept={acceptFile} />
	<Button type="label" labelFor={name} style="secondary" title={value ? 'Change File' : 'Select File'} alignment="center" />

	{#if fileName}
		{#if showImage}
			<img class="outset" alt={fileName} src={imagePreviewSrc} />
		{:else}
			<div class="file-preview">
				<FileIcon size={30} />
				<p>{fileName}</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.file-input {
		display: flex;
		flex-direction: column;
		grid-row-gap: var(--padding-3);

		input[type='file'] {
			opacity: 0;
			width: 0.1px;
			height: 0.1px;
			position: absolute;
		}

		img {
			width: 100%;
			max-width: 370px;
			border-radius: var(--border-radius-s);
			object-fit: cover;
		}

		.file-preview {
			display: grid;
			justify-items: center;
			align-items: center;
			padding: var(--padding-1) var(--padding-3);
			border: 1px solid var(--grey-borders);
			border-radius: var(--border-radius-s);
			background-color: var(--grey-background-1);
			grid-gap: var(--padding-3);

			p {
				text-align: center;
				margin: 0;
				color: var(--grey-text-1);
			}
		}
	}
</style>
