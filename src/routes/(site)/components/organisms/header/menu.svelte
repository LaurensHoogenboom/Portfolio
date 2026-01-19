<script lang="ts">
	import { Folder, IdCard, Mail, Menu } from '@lucide/svelte';
	import Button from '$siteComponents/atoms/button.svelte';

	let expanded = $state(false);
    const closeMenu = () => expanded = false;
</script>

<button class="expand-button" aria-label="expand-main-navigation" onclick={() => (expanded = !expanded)}>
	<Menu size={40} strokeWidth={2} />
</button>

<div class="nav-items {expanded ? 'expanded' : ''}">
	<Button type="goto" href="#about" title="Over" icon={IdCard} style="inline" onclick={closeMenu} />
	<Button type="goto" href="#portfolio" title="Portfolio" icon={Folder} style="inline" onclick={closeMenu} />
	<Button type="goto" href="#contact" title="Contact" icon={Mail} style="inline" onclick={closeMenu} />
</div>

<style>
	.expand-button {
		display: none;

		@media (max-width: 1180px) {
			display: block;
			height: 45px;
			width: 45px;
			background: none;
			border: none;
		}
	}

	.nav-items {
		display: grid;
		grid-gap: 30px;
		grid-auto-flow: column;
		align-items: center;

		@media (max-width: 1180px) {
            display: grid;
            grid-auto-flow: row;
            justify-content: start;
            padding-bottom: 0;
            overflow: hidden;
            height: 0;
            opacity: 0;
            grid-column: 1 / -1;
            pointer-events: none;
            transition: height var(--default-animation-duration), opacity var(--default-animation-duration), padding var(--default-animation-duration);

			&.expanded {
                height: auto;
                opacity: 1;
                pointer-events: all;
                padding-bottom: var(--spacing-7);
			}
		}
	}
</style>
