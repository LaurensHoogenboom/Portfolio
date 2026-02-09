import type { ISelectOption } from "$cmsComponents/atoms/inputs/select.svelte";
import type { UploadFileType } from "$lib/types/uploads";

interface ISelectUploadType extends ISelectOption {
    title: string;
    value: UploadFileType;
}

const uploadSelectOptions: ISelectUploadType[] = [
    { value: 'document', title: 'Document' },
    { value: 'image', title: 'Image' }
];

export { uploadSelectOptions }