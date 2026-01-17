<script lang="ts">
    import { typewriter } from "$lib/utils/transitions/typewriter";

    let i = $state(0);

	const messages = [
		"Onderzoek",
		"Vormgeving",
		"Tekeningen"
	]

	$effect(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= messages.length;
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<h1>
    {#key i}
        <span in:typewriter={{ speed: 0.9 }}>
            {messages[i] || ''}
        </span>
    {/key}

    &nbsp;
</h1>

<style>
    h1:after {
        content: 'D';
        opacity: 0.3;

		@media (max-width: 1600px) {
			content: 'E';
			left: 30%;
		}
    }
</style>
