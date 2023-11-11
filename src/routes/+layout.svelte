<script>
	import { titleStore } from '$lib/stores';
	import '../app.postcss';
</script>

<svelte:head>
	<title>{$titleStore}</title>
</svelte:head>

<main class="md:container w-full h-full overflow-hidden">
	<slot />
</main>
