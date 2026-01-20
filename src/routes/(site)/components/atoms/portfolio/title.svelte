<script lang="ts"></script>

<div class="title">
    <h1>Portfolio</h1>
    <hr />
</div>

<style>
    .title {
		display: grid;
		grid-template-columns: max-content 1fr;
		align-items: center;
		grid-gap: var(--spacing-4);
		position: relative;
		z-index: -1;

		@media (max-width: 680px) {
			text-align: center;
			grid-template-columns: 1fr;
			margin-top: var(--spacing-3);
			justify-self: center;

			hr {
				display: none;
			}

			&:before, 
			&:after {
				content: '';
				display: block;
				position: absolute;
				height: 1px;
				width: calc((100vw - 100% - 2 * var(--vertical-spacing)) / 2);
				background-color: var(--primary-borders);
				top: 40%
			}

			&:before {
				right: calc(100% + var(--spacing-3));
			}

			&:after {
				left: calc(100% + var(--spacing-3));
			}
		}

		h1::after {
			content: 'P';
		}
	}
</style>