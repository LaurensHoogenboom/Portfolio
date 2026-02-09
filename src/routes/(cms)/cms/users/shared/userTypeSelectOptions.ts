import type { ISelectOption } from "$cmsComponents/atoms/inputs/select.svelte";
import type { UserType } from "$lib/types/users";

interface ISelectUserType extends ISelectOption {
    title: string;
    value: UserType
}

const userTypeSelectOptions: ISelectUserType[] = [
    { value: 'admin', title: 'Administrator' },
    { value: 'default', title: 'Default' }
]

export { userTypeSelectOptions }