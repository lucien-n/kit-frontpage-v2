<script lang="ts">
	import type { Link } from '$lib/types';

	export let link: Link;
</script>

<a href={link.link} class="flex gap-1 items-center group">
	{#if link.icon}
		<picture class="w-7 h-7">
			<img src={link.icon} alt="link icon" />
		</picture>
	{/if}
	{#if link.label}
		<p class="font-semibold group-hover:underline">{link.label}</p>
	{/if}
</a>
