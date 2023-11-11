<script lang="ts">
	import Profile from '$lib/components/Profile.svelte';
	import type { Link } from '$lib/types';

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

<div class="flex h-full w-full justify-center">
	<Profile
		githubName="lucien-n"
		name="Lucien Neuhoff"
		workPlace={{ label: '@Everping', link: 'https://www.linkedin.com/company/everping/' }}
		{links}
	/>
</div>
