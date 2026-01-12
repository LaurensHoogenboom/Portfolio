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
	}
</style>
