import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { signinSchema } from './schema';
import { superValidate } from 'sveltekit-superforms/client';
import { AuthApiError } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/');
	}

	return {
		form: superValidate(signinSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signinSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const email = form.data.email;
		const password = form.data.password;

		const { error } = await event.locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					error: 'Invalid credentials.'
				});
			}

			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}
	}
};
