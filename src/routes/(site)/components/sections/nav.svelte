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
				min-height: 100svh;
				border-radius: 0;

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

			@media (max-width: 680px) {
				grid-template-columns: 45px 1fr 45px;
				grid-column-gap: 0;
			}
		}

		h1.logo {
			font-size: 30px;
			font-family: 'Adobe Handwriting';
			padding-bottom: 0;
			font-weight: normal;

			&:after {
				content: 'LTH';
				font-size: 60px;
				top: 10px;
				left: 50%;
				transform: translateX(-50%) translateY(0);
				opacity: 0.2;
				line-height: 60px;

				@media (max-width: 680px) {
					font-size: 50px;
					line-height: 50px;
				}
			}

			@media (max-width: 680px) {
				font-size: 22px;
				grid-column-start: 2;
				text-align: center;
			}
		}

		hr {
			@media (max-width: 680px) {
				opacity: 0;
				grid-column-start: 1;
			}
		}
	}
</style>
