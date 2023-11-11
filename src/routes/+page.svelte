<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Link } from '$lib/types';
	import { LogOut, Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Projects from '$lib/components/Projects.svelte';

	export let data: PageData;

	$: ({ session, supabase } = data);

	const links: Link[] = [
		{
			icon: 'https://github.com/favicon.ico',
			link: 'https://github.com/lucien-n',
			label: 'Github'
		},
		{
			icon: 'https://www.linkedin.com/favicon.ico',
			link: 'https://www.linkedin.com/in/lucien-neuhoff',
			label: 'LinkedIn'
		}
	];
</script>

<div class="flex flex-col h-full w-full justify-between items-center p-3">
	<Profile
		githubName="lucien-n"
		name="Lucien Neuhoff"
		workPlace={{ label: '@Everping', link: 'https://www.linkedin.com/company/everping/' }}
		{links}
	/>
	<Projects {supabase} />
	<div class="flex gap-2">
		{#if session}
			<Button href="new" class="flex gap-1">
				New
				<Plus /></Button
			>
			<Button variant="destructive" class="flex gap-1" href="/signout">
				<LogOut /></Button
			>
		{/if}
	</div>
</div>
