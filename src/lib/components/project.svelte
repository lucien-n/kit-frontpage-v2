<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { sessionStore } from '$lib/stores';
	import { Edit, Github, Loader2, Trash } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { toast } from 'svelte-sonner';

	export let project: TProject;

	const dispatch = createEventDispatcher();

	let loading = false;
	const deleteProject = async () => {
		loading = true;
		const res = await fetch(`/api/project/${project.uid}`, { method: 'DELETE' });
		loading = false;

		if (res.status === 204) {
			toast.success(`Deleted "${project.name}"`);
			dispatch('delete', project);
		} else {
			toast.error(`An error occured while deleting "${project.name}"`);
		}
	};
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
			<div class="flex gap-3">
				<Button variant="secondary" href="/edit/{project.uid}"><Edit /></Button>
				<Button variant="destructive" on:click={deleteProject} disabled={loading}
					><Trash />
					{#if loading}
						<div class="animate-spin">
							<Loader2 />
						</div>
					{/if}
				</Button>
			</div>
		{/if}
	</Card.Footer>
</Card.Root>
