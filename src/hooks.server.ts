// src/hooks.server.ts
import { PUBLIC_SUPA_URL, PUBLIC_SUPA_ANON_KEY } from '$env/static/public';
import { checkSession } from '$lib/server/helper';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const {
		locals,
		url: { pathname }
	} = event;

	locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPA_URL,
		supabaseKey: PUBLIC_SUPA_ANON_KEY,
		event
	});

	locals.getSession = async () => {
		const {
			data: { session }
		} = await locals.supabase.auth.getSession();
		return session;
	};

	if (pathname.startsWith('/api')) {
		const { session: _, response } = checkSession(await locals.getSession());
		if (response) return response;
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
