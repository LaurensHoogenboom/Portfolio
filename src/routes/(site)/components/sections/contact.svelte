<script lang="ts">
	import { Mail, Phone } from "@lucide/svelte";
    import Button from "$siteComponents/atoms/button.svelte";
    import ContentContainer from "$siteComponents/atoms/contentContainer.svelte";
	import LabelInputGroup from "$siteComponents/molecules/labelInputGroup.svelte";
	import ButtonLinkGroup from "$siteComponents/molecules/buttonLinkGroup.svelte";
</script>

<ContentContainer id="contact" theme="transparent">
    <div>
        <h1>Contact</h1>
        <p>Laten we verder praten.</p>

        <div class="contact-info">
            <ButtonLinkGroup>
                <Button icon={Mail} type="goto" id="mailadres" style="secondary"/>
                <a href="mailto:me@laurens">mail@laureato.nl</a>
            </ButtonLinkGroup>

            <ButtonLinkGroup>
                <Button icon={Phone} type="goto" id="phonenumber" style="secondary"/>
                <a href="tel:+31622854800">+31 6 22 85 48 00</a>
            </ButtonLinkGroup>
        </div>
    </div>

    <div>
        <form>
            <LabelInputGroup name="name" type="text" label="Naam" required={true}/>
            <LabelInputGroup name="name" type="email" label="E-mailadres" required={true}/>
            <LabelInputGroup name="message" type="textarea" label="Bericht" required={true}/>

            <Button type="submit" title="Versturen" CSSClass="submit-button" />
        </form>
    </div>
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

            &:before {
                content: '';
                background-color: var(--grey-inset-background-light);
                height: 60px;
                position: absolute;
                top: -40px;
                left: calc(var(--spacing-5) * 2);
                right: calc(var(--spacing-5) * 2);
                border: 1px solid var(--grey-borders);
                border-top-left-radius: var(--border-radius-3);
                border-top-right-radius: var(--border-radius-3);
                z-index: -1;
                transition: top var(--default-animation-duration);
            }

            @media (hover:hover) {
                :global(&:has(form button:hover):before) {
                    top: -50px;
                }
            }

            h1:after {
                content: 'C';
                transform: translate(-10%);
            }

            .contact-info {
                display: flex;
                flex-direction: column;
                row-gap: var(--spacing-3);
            }

            form {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-row-gap: var(--spacing-4);
                grid-column-gap: var(--spacing-4);

                :global(.submit-button) {
                    justify-self: start;
                }
            }
        }
    }
</style>