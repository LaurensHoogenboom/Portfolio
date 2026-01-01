<script lang="ts">
	import { Instagram, Linkedin } from '@lucide/svelte';
	import Button from '../atoms/button.svelte';
	import ContentContainer from '../atoms/contentContainer.svelte';
	import profilePicture from '$lib/media/site/about/profile.jpg';
	import curiculumVitae from '$lib/media/site/about/Curiculum Vitae.pdf';
</script>

<ContentContainer id="about" width="wide">
	<div class="about-content">
		<div class="profile-picture" style="background-image: url('{profilePicture}');"></div>
		<div class="main-content">
			<article>
				<h1>Over Mij</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel ullamcorper quam, laoreet eleifend lorem. Duis finibus sem ante,
					et iaculis eros blandit vitae. Nunc eleifend sed nibh at posuere. Vivamus non rhoncus lorem.
				</p>
				<p>
					Nunc eleifend sed nibh at posuere. Vivamus non rhoncus lorem unc eleifend sed nibh at posuere. Vivamus non rhoncus lorem. Vivamus
					non rhoncus lorem.
				</p>
			</article>
			<div style="padding-bottom: var(--spacing-4);">
				<Button type="goto" style="primary" title="Portfolio" href="#portfolio" />
				<Button type="goto-external" style="secondary" title="Curiculum Vitae" href={curiculumVitae} />
				<Button type="goto" style="secondary" title="Contact" href="#contact" />
			</div>
			<div>
				<Button type="goto-external" icon={Instagram} style="secondary" href="https://www.instagram.com/laureato_/" />
				<Button
					type="goto-external"
					icon={Linkedin}
					style="secondary"
					href="https://www.linkedin.com/in/laurens-hoogenboom-3aa78515a/"
				/>
			</div>
		</div>
	</div>
</ContentContainer>

<style>
	.about-content {
		display: grid;
		grid-template-columns: 400px 1fr 200px;
		grid-gap: var(--spacing-6);
		align-items: center;

		.profile-picture {
			position: relative;
			aspect-ratio: 1 / 1;
			border-radius: 100%;
			box-shadow: var(--grey-shadow-1);
			border: 10px solid var(--white);
			max-height: 450px;
			z-index: 2;
			background-size: cover;
			background-position: center;
		}

		.main-content {
			padding-top: var(--spacing-4);
		}
	}

	h1:after {
		content: 'O';
	}
</style>
