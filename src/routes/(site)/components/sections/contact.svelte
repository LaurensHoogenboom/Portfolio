<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte';
	import Button, { type ButtonActionStatus } from '$siteComponents/atoms/button.svelte';
	import ContentContainer from '$siteComponents/atoms/contentContainer.svelte';
	import LabelInputGroup from '$siteComponents/molecules/labelInputGroup.svelte';
	import ButtonLinkGroup from '$siteComponents/molecules/buttonLinkGroup.svelte';
	import { enhance } from '$app/forms';
	import Notice from '$siteComponents/atoms/notice.svelte';

	let { success, message }: { success?: boolean; message?: string } = $props();
	let buttonStatus: ButtonActionStatus | undefined = $state();

	$effect(() => {
		if (success || message) {
			setTimeout(() => {
				buttonStatus = undefined;
				success = undefined;
				message = undefined;
			}, 6000);
		}
	});
</script>

<ContentContainer id="contact" theme="transparent">
	<article>
		<h1>Contact</h1>
		<p>Vragen, opmerkingen, over mijzelf, mijn werk of deze website? Of gewoon zin in een bak koffie? Neem gerust contact op!</p>
	</article>

	<div class="contact-info">
		<ButtonLinkGroup>
			<Button icon={Mail} type="goto" id="mailadres" style="secondary" />
			<a href="mailto:me@laurens">info@laurenshoogenboom.nl</a>
		</ButtonLinkGroup>

		<ButtonLinkGroup>
			<Button icon={Phone} type="goto" id="phonenumber" style="secondary" />
			<a href="tel:+31622854800">+31 6 22 85 48 00</a>
		</ButtonLinkGroup>
	</div>

	<form
		method="POST"
		action="?/sendmail"
		enctype="multipart/form-data"
		use:enhance={() => {
			buttonStatus = 'processing';

			return async ({ update }) => {
				await update({ reset: false });
				buttonStatus = 'success';
			};
		}}
	>
		{#if message}
			<Notice message={message} type={success ? 'success' : 'fail'} />
		{/if}

		<LabelInputGroup name="name" type="text" label="Naam" required={true} />
		<LabelInputGroup name="email" type="email" label="E-mailadres" required={true} />
		<LabelInputGroup name="message" type="textarea" label="Bericht" required={true} />

		<Button type="submit" title="Versturen" CSSClass="submit-button" actionStatus={buttonStatus} />
	</form>
</ContentContainer>

<style>
	:global(#contact) {
		margin-top: calc(0px - var(--border-radius-3));
		padding-top: calc(var(--spacing-7) * 2);
		background: var(--primary-background-gradient);
		border-bottom-left-radius: var(--border-radius-3);
		border-bottom-right-radius: var(--border-radius-3);
		--extra-space: calc((100vw - var(--page-width)) / 2);
		position: relative;
		z-index: 0;

		:global(.content-container) {
			display: grid;
			position: relative;
			grid-template-columns: max-content 1fr;
			grid-template-rows: max-content 1fr;
			grid-column-gap: var(--spacing-8);
			border: 1px solid var(--grey-borders);
			background: var(--white-background-gradient);
			border-radius: var(--border-radius-3);
			margin-bottom: calc(0px - var(--border-radius-3) * 2);
			margin-left: calc(0px - var(--extra-space));
			margin-right: calc(0px - var(--extra-space));
			width: min(100%, (var(--page-width) + var(--extra-space)));
			padding-left: calc(var(--spacing-6) + var(--extra-space) / 2);
			padding-right: calc(var(--spacing-6) + var(--extra-space) / 2);
			box-shadow: var(--grey-shadow-2);

			@media (max-width: 1500px) {
				--extra-space: calc(var(--vertical-spacing) * 2);
				padding-top: 100px;
				padding-left: var(--vertical-spacing);
				padding-right: var(--vertical-spacing);
				grid-template-columns: 1fr 1fr;
				grid-column-gap: var(--spacing-7);
				grid-template-columns: repeat(2, minmax(0, 1fr));
			}

			@media (max-width: 1180px) {
				grid-template-columns: 1fr;
				grid-gap: var(--spacing-5);
			}

			&:before {
				content: '';
				background-color: var(--grey-inset-background-light);
				height: 60px;
				position: absolute;
				top: calc(0px - var(--spacing-5));
				left: calc(var(--spacing-5) * 2);
				right: calc(var(--spacing-5) * 2);
				border: 1px solid var(--grey-borders);
				border-top-left-radius: var(--border-radius-3);
				border-top-right-radius: var(--border-radius-3);
				z-index: -1;
				transition: top var(--default-animation-duration);
			}

			@media (max-width: 1500px) {
				&:before {
					top: calc(0px - var(--spacing-4));
					left: var(--vertical-spacing);
					right: var(--vertical-spacing);
				}
			}

			@media (max-width: 680px) {
				&:before {
					top: calc(0px - var(--spacing-3));
				}
			}

			@media (hover: hover) {
				:global(&:has(form button:hover):before) {
					top: -50px;
				}
			}

			article {
				@media (max-width: 1180px) {
					text-align: center;

					p {
						margin: 0 auto;
					}
				}

				h1:after {
					content: 'C';
					transform: translate(-10%);

					@media (max-width: 1180px) {
						left: 50%;
						transform: translate(-70%);
					}
				}
			}

			.contact-info {
				display: flex;
				flex-direction: column;
				row-gap: var(--spacing-3);
				grid-column-start: 1;
				padding-top: var(--spacing-3);
			}

			form {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-row-gap: var(--spacing-4);
				grid-column-gap: var(--spacing-4);
				grid-column-start: 2;
				grid-row-start: 1;
				grid-row-end: 3;

				:global(.submit-button) {
					justify-self: start;
				}

				@media (max-width: 1180px) {
					grid-template-columns: 1fr;
					grid-column-start: 1;
					grid-row-start: initial;
				}
			}
		}
	}
</style>
