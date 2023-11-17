<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { sessionStore } from '$lib/stores';
	import { Edit, Github, Trash } from 'lucide-svelte';

	export let project: TProject;
</script>

<Card.Root class="h-full w-full flex flex-col">
	<Card.Header class="text-4xl font-semibold">
		{project.name}
	</Card.Header>
	<Card.Content class="text-lg">
		{project.description}
	</Card.Content>
	<Card.Footer class="mt-auto flex justify-between">
		<Button href="https://github.com/lucien-n/{project.slug}" class="flex items-center gap-1 w-fit"
			><Github /> <strong>{project.branch}</strong></Button
		>
		{#if $sessionStore}
			<Button variant="secondary" href="/edit/{project.uid}"><Edit /></Button>
			<Button variant="destructive" href="/api/project/{project.uid}?delete"><Trash /></Button>
		{/if}
	</Card.Footer>
</Card.Root>
