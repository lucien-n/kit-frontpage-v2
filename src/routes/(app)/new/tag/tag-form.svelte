<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Form from '$lib/components/ui/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Loader2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { tagSchema, type TagSchema } from '$lib/schemas/tag-schema';

	export let form: SuperValidated<TagSchema>;

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

<Form.Root schema={tagSchema} {form} let:config>
	<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-2">
		<Form.Field {config} name="label">
			<Form.Item>
				<Form.Label>Label</Form.Label>
				<Form.Input type="text" minlength={3} maxlength={24} placeholder="SvelteKit" />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="color">
			<Form.Item>
				<Form.Label>Color</Form.Label>
				<Form.Input type="text" minlength={6} maxlength={6} placeholder="1F0CAB" />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="link">
			<Form.Item>
				<Form.Label>Link (optional)</Form.Label>
				<Form.Input
					type="text"
					minlength={3}
					maxlength={255}
					placeholder="https://kit.svelte.dev/"
				/>
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading} class="flex gap-2">
			<p
				class="transition-all ease-in-out duration-200"
				transition:slide={{ axis: 'x', duration: 200 }}
			>
				{loading ? 'Creating' : 'Create'}
			</p>
			{#if loading}
				<span class="animate-spin" transition:slide={{ axis: 'x', duration: 200 }}>
					<Loader2 />
				</span>
			{/if}
		</Form.Button>
	</form>
</Form.Root>
