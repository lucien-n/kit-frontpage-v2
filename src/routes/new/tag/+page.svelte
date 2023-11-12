<script lang="ts">
	import { goto } from '$app/navigation';
	import Tag from '$lib/components/tag.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import ProjectForm from './tag-form.svelte';

	export let data: PageData;

	let error = '';

	const onFailure = ({ detail }: CustomEvent<any>) => {
		error = detail.error;
	};

	const onSuccess = () => {
		goto('/', { invalidateAll: true });
	};
</script>

<section class="w-full h-full flex justify-center items-center">
	<div class="w-full md:w-2/3 lg:w-3/5 xl:w-2/5 gap-2 flex flex-col">
		{#if error}
			<Alert.Root>
				<Alert.Title class="font-semibold">Error</Alert.Title>
				<Alert.Description>{error}</Alert.Description>
			</Alert.Root>
		{/if}

		<Card.Root class="w-full">
			<Card.Content>
				<ProjectForm form={data.form} on:success={onSuccess} on:failure={onFailure} />
			</Card.Content>
		</Card.Root>
	</div>
</section>
