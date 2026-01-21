<script lang="ts">
	import { Instagram, Linkedin } from '@lucide/svelte';
	import Button from '$siteComponents/atoms/button.svelte';
	import ContentContainer from '$siteComponents/atoms/contentContainer.svelte';

	let currentYear = new Date().getFullYear();
</script>

<footer>
	<ContentContainer>
		<div class="footer-content">
			<p>Copyright &copy; LTH {currentYear} &nbsp; <a href="/">Privacy Verklaring</a></p>

			<hr />

			<h1 class="watermark">LTH</h1>

			<hr />

			<div>
				<Button type="goto-external" icon={Instagram} style="secondary" href="https://www.instagram.com/laureato_/" />
				<Button type="goto-external" icon={Linkedin} style="secondary" href="https://www.linkedin.com/in/laurens-hoogenboom-3aa78515a/" />
			</div>
		</div>
	</ContentContainer>
</footer>

<style>
	.footer-content {
		display: grid;
		grid-template-columns: max-content 1fr max-content 2fr max-content;
		grid-column-gap: var(--spacing-4);
		width: 100%;
		align-items: center;
		height: calc(150px + 2 * var(--border-radius-3));
		padding-top: var(--spacing-5);

		@media (max-width: 1180px) {
			grid-auto-flow: column;
			grid-template-columns: max-content max-content 2fr max-content;

			hr:first-of-type {
				display: none;
			}

			.watermark {
				grid-column-start: 1;
				padding-right: var(--spacing-2);
			}
		}

		.watermark {
			color: var(--grey-ornament);
			font-family: 'Adobe Handwriting', serif;
			padding-bottom: 0;
			font-size: 50px;
			line-height: 50px;
			padding-top: 20px;
		}

		p {
			padding-bottom: 0;
		}

		@media (max-width: 900px) {
			grid-template-columns: 1fr;
			grid-auto-flow: row;
			justify-items: center;
			padding-top: calc(var(--spacing-7) + var(--border-radius-3));
			padding-bottom: var(--spacing-7);
			height: initial;
			grid-row-gap: var(--spacing-4);

			.watermark {
				grid-row-start: 1;
			}

			p {
				text-align: center;
				padding-bottom: var(--spacing-2);

				a {
					display: inline-block;
					padding-top: var(--spacing-2);
					width: 100%;
				}
			}

			hr:first-of-type {
				display: block;
				width: 50px;
				grid-row-start: 2;
			}

			hr:last-of-type {
				display: none;
			}
		}
	}
</style>
