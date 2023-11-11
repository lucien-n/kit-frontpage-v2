import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { projectSchema } from './schema';
import { superValidate } from 'sveltekit-superforms/client';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/');
	}

	return {
		form: superValidate(projectSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase }
		} = event;
		const form = await superValidate(event, projectSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, description, slug, branch } = form.data;

		const { error } = await supabase
			.from('repositories')
			.insert({ name, description, slug, branch });

		if (error) {
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}
	}
};
