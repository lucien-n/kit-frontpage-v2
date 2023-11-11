<script>
	import { titleStore } from '$lib/stores';
	import '../app.postcss';
</script>

<svelte:head>
	<title>{$titleStore}</title>
</svelte:head>

<main class="container w-full h-full overflow-hidden">
	<slot />
</main>
