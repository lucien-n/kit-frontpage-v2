<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { onDestroy } from 'svelte';

	export let numberOfItems: number;
	export let currentIndex = 0;

	const next = () => (currentIndex = currentIndex + 1 > numberOfItems ? 0 : currentIndex + 1);

	const previous = () => (currentIndex = currentIndex - 1 < 0 ? numberOfItems : currentIndex - 1);
</script>

<div class="h-full w-full flex items-center gap-3" role="banner">
	<Button variant="ghost" on:click={previous}>
		<ChevronLeft />
	</Button>
	<div class="w-full h-full">
		{#key currentIndex}
			<slot />
		{/key}
	</div>
	<Button variant="ghost" on:click={next}>
		<ChevronRight />
	</Button>
</div>
