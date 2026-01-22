<script lang="ts">
	import { ChevronUp } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { scrollContainer }: { scrollContainer?: HTMLElement | Window } = $props();

	let visible = $state(false);

	onMount(() => {
		const containerToBind = scrollContainer ? scrollContainer : window;

		containerToBind.addEventListener('scroll', () => {
			const scrollTop = containerToBind instanceof Window ? document.documentElement.scrollTop : containerToBind.scrollTop;
			visible = scrollTop > window.innerHeight / 2 ? true : false;
		});
	});

    const scrollToTop = () => {
        const containerToBind = scrollContainer ? scrollContainer : window;
        containerToBind.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
</script>

<button class="scroll-to-top-button {visible ? 'visible' : ''}" onclick={scrollToTop}>
	<ChevronUp size={25} />
</button>

<style>
	.scroll-to-top-button {
		position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
		right: 0;
		bottom: var(--spacing-7);
		height: 45px;
		width: 45px;
		background-color: rgba(0, 0, 0, 0.5);
		border-top-left-radius: var(--border-radius-2);
		border-bottom-left-radius: var(--border-radius-2);
		color: var(--white);
		border: none;
        transition: transform var(--default-animation-duration), opacity var(--default-animation-duration);
        opacity: 0.9;
		z-index: 10;

		&:not(.visible) {
			transform: translateX(100%);
		}

        @media (hover:hover) and (pointer: fine) {
            &:hover {
                cursor: pointer;
                opacity: 1.0;
            }
        }

		@media (max-width: 680px) {
			bottom: var(--spacing-8);
		}
		@media (max-width: 420px) {
			bottom: var(--spacing-5);
		}
	}
</style>
