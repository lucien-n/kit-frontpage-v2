<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { onDestroy } from 'svelte';

	export let numberOfItems: number;
	export let delayBetweenSwipes: number = 5000;
	export let currentIndex = 0;

	let lastSwipeAt = new Date().getTime();
	let swipeProgress = 0;
	let swipeProgressElement: HTMLElement;
	let hovering = false;

	const next = () => (currentIndex = currentIndex + 1 > numberOfItems ? 0 : currentIndex + 1);

	const previous = () => (currentIndex = currentIndex - 1 < 0 ? numberOfItems : currentIndex - 1);

	const swipeInterval = setInterval(() => {
		if (hovering) return;
		next();
		lastSwipeAt = new Date().getTime();
	}, delayBetweenSwipes);

	const progressInterval = setInterval(() => {
		if (hovering) {
			lastSwipeAt = new Date().getTime();
			return;
		}
		swipeProgress = ((new Date().getTime() - lastSwipeAt) / delayBetweenSwipes) * 100;
		swipeProgressElement.style.width = `${swipeProgress}%`;
	}, 20);

	onDestroy(() => {
		clearInterval(swipeInterval);
		clearInterval(progressInterval);
	});
</script>

<div
	class="h-full w-full flex items-center gap-3"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	role="banner"
>
	<Button variant="ghost" on:click={previous}>
		<ChevronLeft />
	</Button>
	<div class="w-full h-full">
		{#key currentIndex}
			<slot />
		{/key}
		<br />
		<div class="w-4/5 mx-auto h-2 bg-primary/30 rounded-full">
			<div class="h-full bg-primary rounded-full" bind:this={swipeProgressElement} />
		</div>
	</div>
	<Button variant="ghost" on:click={next}>
		<ChevronRight />
	</Button>
</div>
