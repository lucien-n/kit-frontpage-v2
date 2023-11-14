<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import { getProjects } from '$lib/supabase/projects';
	import Carousel from './carousel.svelte';
	import Project from './project.svelte';

	export let supabase: SupabaseClient;

	let projects: TProject[] = [];
	let currentProjectIndex = 0;

	onMount(async () => {
		projects = (await getProjects(supabase)) || [];
	});

	const getCurrentProject = () =>
		currentProjectIndex <= projects.length ? projects[currentProjectIndex] : ({} as TProject);
</script>

{#if projects.length}
	<div class="w-full lg:w-2/3 xl:w-3/5 h-3/5">
		<Carousel numberOfItems={projects.length - 1} bind:currentIndex={currentProjectIndex}>
			<Project project={getCurrentProject()} />
		</Carousel>
	</div>
{:else}
	<h1 class="text-3xl">No projects to show</h1>
{/if}
