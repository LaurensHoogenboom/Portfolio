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
		}, 4000);

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
    }
</style>
