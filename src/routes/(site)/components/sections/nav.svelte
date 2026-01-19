<script lang="ts">
	import Menu from '$siteComponents/organisms/header/menu.svelte';
</script>

<nav class="content-container-wrapper section-dark">
	<div class="content-container">
		<h1 class="logo">Laurens Hoogenboom</h1>
		<hr />
		<Menu />
	</div>
</nav>

<style>
	nav {
		position: relative;
		width: 100%;
		min-height: var(--nav-height);
		border-bottom-left-radius: var(--border-radius-3);
		border-bottom-right-radius: var(--border-radius-3);
		z-index: 2;
        transition: min-height var(--default-animation-duration);

		@media (max-width: 1180px) {
            .content-container {
                grid-template-rows: var(--nav-height) 1fr;
            }

			:global(&:has(.expanded)) {
				min-height: 100dvh;

				.content-container {
                    grid-row-gap: 0;
				}
			}
		}

		.content-container {
			display: grid;
			grid-template-columns: max-content 1fr max-content;
			align-items: center;
			grid-column-gap: var(--spacing-4);

			h1:after {
				content: 'LTH';
				font-size: 60px;
				top: 15px;
				left: 50%;
				transform: translateX(-50%) translateY(0);
				opacity: 0.2;
				line-height: 60px;
			}
		}

		.logo {
			font-size: 30px;
			font-family: 'Adobe Handwriting';
			padding-bottom: 0;
			font-weight: normal;
		}
	}
</style>
