<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Eye, EyeOff, Loader2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { signinSchema, type SigninSchema } from './schema';
	import { slide } from 'svelte/transition';

	export let form: SuperValidated<SigninSchema>;

	const dispatch = createEventDispatcher();

	let loading = false;
	let showPassword: boolean = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			loading = false;
			// @ts-ignore
			dispatch(result.type, result.data);
		};
	};

	const toggleShowPassword = () => {
		showPassword = !showPassword;
	};
</script>

<Form.Root schema={signinSchema} {form} let:config>
	<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-2">
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Input type="email" placeholder="jhon.doe@mail.com" />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<div class="flex">
					<Form.Input
						type={showPassword ? 'text' : 'password'}
						minlength={8}
						maxlength={255}
						placeholder="●●●●●●●●"
						class="rounded-r-none"
					/>
					<Button on:click={toggleShowPassword} class="rounded-l-none" type="button">
						{#if showPassword}
							<EyeOff />
						{:else}
							<Eye />
						{/if}
					</Button>
				</div>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading} class="flex gap-2">
			<p
				class="transition-all ease-in-out duration-200"
				transition:slide={{ axis: 'x', duration: 200 }}
			>
				{loading ? 'Signing In' : 'Sign In'}
			</p>
			{#if loading}
				<span class="animate-spin" transition:slide={{ axis: 'x', duration: 200 }}>
					<Loader2 />
				</span>
			{/if}
		</Form.Button>
	</form>
</Form.Root>
