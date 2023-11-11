<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Github } from 'lucide-svelte';
	import Separator from './ui/separator/separator.svelte';

	export let supabase: SupabaseClient;

	let projects: TProject[] = [];

	onMount(async () => {
		const { data, error } = await supabase.from('projects').select('*');
		if (error || !data) return;

		projects = data;
	});
</script>

{#if projects.length}
	<Accordion.Root class="w-4/5 xl:w-3/5">
		{#each projects as { uid, name, description, slug, branch }}
			<Accordion.Item value={uid}>
				<Accordion.Trigger>{name}</Accordion.Trigger>
				<Accordion.Content>
					<p>
						{description}
					</p>
					<br />
					<Separator orientation="horizontal" />
					<br />
					<Button href="https://github.com/lucien-n/{slug}" class="flex items-center gap-1 w-fit"
						><Github /> <strong>{branch}</strong></Button
					>
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
{:else}
	<h1 class="text-3xl">No projects to show</h1>
{/if}
