<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import ProjectForm from '$lib/components/project-form.svelte';

	export let data: PageData;

	const onFailure = ({ detail }: CustomEvent<any>) => {
		toast.error('Error', { description: detail.error });
	};

	const onSuccess = () => {
		toast.success('Project created');
		goto('/', { invalidateAll: true });
	};
</script>

<section class="w-full h-full flex justify-center items-center">
	<div class="w-full md:w-2/3 lg:w-3/5 xl:w-2/5 gap-2 flex flex-col">
		<Card.Root class="w-full">
			<Card.Content>
				<ProjectForm form={data.form} on:success={onSuccess} on:failure={onFailure} mode="create" />
			</Card.Content>
		</Card.Root>
	</div>
</section>
