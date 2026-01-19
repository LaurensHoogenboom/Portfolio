<script lang="ts">
	import { BookDashed, Code, Instagram, Linkedin, PencilRuler } from '@lucide/svelte';
	import Button from '$siteComponents/atoms/button.svelte';
	import ContentContainer from '$siteComponents/atoms/contentContainer.svelte';
	import profilePicture from '$lib/media/site/about/profile.jpg';
	import curiculumVitae from '$lib/media/site/about/Curiculum Vitae.pdf';
	import IconSquare from '$siteComponents/atoms/about/iconSquare.svelte';
	import IdCard from '$siteComponents/atoms/about/idCard.svelte';
</script>

<ContentContainer id="about" width="wide">
	<div class="about-content">
		<div class="profile-picture" style="background-image: url('{profilePicture}');"></div>
		<div class="main-content">
			<article>
				<h1>Over Mij</h1>
				<p>De kern van het verhaal: ik ben een maker (professionele knustelaar 😉) op het spanningsveld tussen systeem en beleving.</p>
				<p>
					<b>Als analist,</b> breng ik de behoeften, waarden en routines van mens en systeem in kaart. <b>Als ontwerper,</b> maak ik
					toepassingen die mogelijke spanningsvelden hiertussen inzichtelijk maken en/of overbruggen. <b>Als vormgever c.q. artiest,</b> maak
					ik het voorgaande tastbaar.
				</p>
				<p>
					Bij dit alles combineer ik ervaring als ontwikkelaar, interactie ontwerper en artiest om snel tot inzichten, prototypes en
					resultaten te komen
				</p>
			</article>
			<div style="padding-bottom: var(--spacing-4);">
				<Button type="goto" style="primary" title="Portfolio" href="#portfolio" />
				<Button type="goto-external" style="secondary" title="Curiculum Vitae" href={curiculumVitae} />
				<Button type="goto" style="secondary" title="Contact" href="#contact" />
			</div>
			<div>
				<Button type="goto-external" icon={Instagram} style="secondary" href="https://www.instagram.com/laureato_/" />
				<Button type="goto-external" icon={Linkedin} style="secondary" href="https://www.linkedin.com/in/laurens-hoogenboom-3aa78515a/" />
			</div>
		</div>
		<div class="ornaments">
			<IconSquare icon={PencilRuler} CSSClass="design-icon" />
			<IconSquare icon={BookDashed} CSSClass="research-icon" />
			<IconSquare icon={Code} CSSClass="code-icon" />
			<IdCard CSSClass="id-card" />
		</div>
	</div>
</ContentContainer>

<style>
	:global(#about) {
		overflow: hidden;

		@media (max-width: 1180px) {
			overflow: visible;

			:global(.content-container) {
				padding-top: 0;
			}
		}
	}

	.about-content {
		display: grid;
		grid-template-columns: 450px 1fr 400px;
		grid-gap: var(--spacing-6);
		align-items: center;

		@media (max-width: 1500px) {
			grid-template-columns: 400px 1fr;
		}

		@media (max-width: 1180px) {
			grid-template-columns: 1fr;
			grid-gap: var(--spacing-3);
		}

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

			@media (max-width: 1180px) {
				justify-self: center;
				margin-top: calc(0px - var(--spacing-4));
				width: min(350px, calc(100% - var(--spacing-4)));
			}
		}

		.main-content {
			padding-top: var(--spacing-4);

			@media (max-width: 1180px) {
				text-align: center;

				h1 {
					justify-self: center;
				}
			}

			p {
				max-width: initial;
			}
		}

		.ornaments {
			position: relative;
			width: 100%;
			height: 400px;

			@media (max-width: 1500px) {
				display: none;
			}

			:global(.icon-square) {
				position: absolute;
				z-index: 2;
			}

			:global(.design-icon) {
				top: 0;
				left: 0;
			}

			:global(.research-icon) {
				top: 65px;
				left: 215px;
			}

			:global(.code-icon) {
				top: 215px;
				left: 65px;
			}

			:global(.id-card) {
				position: absolute;
				z-index: 1;
				bottom: -40px;
				left: 130px;
			}
		}
	}

	h1:after {
		content: 'O';
	}
</style>
