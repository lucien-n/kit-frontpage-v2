<script>
	import { sessionStore, titleStore } from '$lib/stores';
	import { Toaster } from 'svelte-sonner';
	import '../../app.postcss';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
			sessionStore.set(_session);
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>{$titleStore}</title>
</svelte:head>

<Toaster richColors />

<main class="md:container w-full h-full overflow-hidden">
	<slot />
</main>
