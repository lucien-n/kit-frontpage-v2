<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="w-full h-full flex items-center justify-center gap-3">
	<h1 class="status">{$page.status}</h1>
	<div class="separator" />
	<h1 class="message">{$page.error?.message}</h1>
</div>

<style>
	.status {
		font-size: 4rem;
	}

	.separator {
		height: 3.5rem;
		outline: 1px solid black;
	}

	.message {
		font-size: 3rem;
		font-weight: 100;
	}
</style>
