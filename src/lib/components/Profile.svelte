<script lang="ts">
	import * as Card from './ui/card';
	import * as Avatar from './ui/avatar';
	import type { Link as TLink } from '$lib/types';
	import Link from './Link.svelte';
	import { toInitials } from '$lib/helper';

	export let githubName: string;
	export let name: string;
	export let links: TLink[];
	export let workPlace: TLink;
</script>

<div class="relative flex items-center h-44 w-fit">
	<Avatar.Root class="h-40 w-40 -right-10">
		<Avatar.Image src="https://avatars.githubusercontent.com/{githubName}" />
		<Avatar.Fallback class="">{toInitials(githubName, '-')}</Avatar.Fallback>
	</Avatar.Root>
	<Card.Root class="h-3/4 p-2 pl-8 flex flex-col justify-between ">
		<Card.Content>
			<h1 class="font-bold text-2xl">
				{name}
			</h1>
			{#if workPlace}
				<div class="flex gap-1">
					<p>Working</p>
					<Link link={workPlace} />
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="p-0 pl-6">
			<div class="flex gap-3">
				{#each links as link}
					<Link {link} />
				{/each}
			</div>
		</Card.Footer>
	</Card.Root>
</div>
