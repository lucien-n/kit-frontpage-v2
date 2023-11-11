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

<div class="flex items-center relative">
	<Card.Root class="flex gap-3">
		<Card.Header class="p-3 pr-0">
			<Avatar.Root class="w-32 h-32">
				<Avatar.Image src="https://avatars.githubusercontent.com/{githubName}" />
				<Avatar.Fallback class="">{toInitials(githubName, '-')}</Avatar.Fallback>
			</Avatar.Root>
		</Card.Header>
		<div class="flex flex-col justify-between p-3 pl-0">
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
			<Card.Footer class="pb-0">
				<div class="flex gap-3 text-base">
					{#each links as link}
						<Link {link} />
					{/each}
				</div>
			</Card.Footer>
		</div>
	</Card.Root>
</div>
