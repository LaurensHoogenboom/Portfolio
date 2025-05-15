<script lang="ts">
	import { onMount } from "svelte";
	import LabelInputGroup from "../molecules/labelInputGroup.svelte";
	import { getRandomId } from "$lib/utils/generateRandomId";

    let newPassword = $state("");
    let confirmPassword = $state("");
    let confirmPasswordId = `confirmPassword-${getRandomId(6)}`;
    let confirmPasswordInput: HTMLInputElement | null;

    onMount(() => {
        if (required || newPassword.length) {
            confirmPasswordInput = document.getElementById(confirmPasswordId) as HTMLInputElement;
        }
    });

    $effect(() => {
        if ((required || newPassword.length) && confirmPassword.length && newPassword != confirmPassword) {
            confirmPasswordInput?.setCustomValidity("The passwords should be indentical.");
        } else {
            confirmPasswordInput?.setCustomValidity("");
        }
    });

    let { requireCurrentPassword, required = true } : { requireCurrentPassword?: boolean, required?: boolean } = $props();
</script>

<LabelInputGroup 
    name="newPassword" 
    type="password" 
    label="New Password" 
    required={required} 
    bind:value={newPassword}
    instruction={!required ? "Leave blank to keep the current password." : undefined}
/>

{#if newPassword.length || required }
    <LabelInputGroup name={confirmPasswordId} type="password" label="Confirm New Password" required={required} bind:value={confirmPassword}/>
{/if}

{#if (required && requireCurrentPassword) || (newPassword.length && requireCurrentPassword)}
    <LabelInputGroup type="password" name="currentPassword" label="Current Password" max={120}/>
{/if}