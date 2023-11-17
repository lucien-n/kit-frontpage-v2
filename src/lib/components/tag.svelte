<script lang="ts">
	import { cn } from '$lib/utils';

	export let tag: TTag;
	const { label, color, link } = tag;
</script>

<div class={cn(`bg-[#${color}]`)}>
	{#if link}
		<a href={link}>
			{label}
		</a>
	{:else}
		{label}
	{/if}
</div>
