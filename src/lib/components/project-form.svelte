<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Form from '$lib/components/ui/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Loader2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { projectSchema, type ProjectSchema } from '$lib/schemas/project-schema';

	export let form: SuperValidated<ProjectSchema>;
	export let mode: 'edit' | 'create' = 'create';

	const dispatch = createEventDispatcher();

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;
			// @ts-ignore
			dispatch(result.type, result.data);
		};
	};
</script>

<Form.Root schema={projectSchema} {form} let:config>
	<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-2">
		<Form.Field {config} name="name">
			<Form.Item>
				<Form.Label>Name</Form.Label>
				<Form.Input type="text" minlength={3} maxlength={80} placeholder="Some Project" />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="description">
			<Form.Item>
				<Form.Label>Description</Form.Label>
				<Form.Textarea
					minlength={3}
					maxlength={255}
					placeholder="This project was made in an attempt to..."
				/>
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="slug">
			<Form.Item>
				<Form.Label>Github Project Name</Form.Label>
				<Form.Input type="text" minlength={3} maxlength={80} placeholder="github-project" />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="branch">
			<Form.Item>
				<Form.Label>Branch</Form.Label>
				<Form.Input type="text" minlength={3} maxlength={80} placeholder="main" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading} class="flex gap-2">
			<p
				class="transition-all ease-in-out duration-200"
				transition:slide={{ axis: 'x', duration: 200 }}
			>
				{#if mode === 'create'}
					{loading ? 'Creating' : 'Create'}
				{:else}
					{loading ? 'Updating' : 'Update'}
				{/if}
			</p>
			{#if loading}
				<span class="animate-spin" transition:slide={{ axis: 'x', duration: 200 }}>
					<Loader2 />
				</span>
			{/if}
		</Form.Button>
	</form>
</Form.Root>
