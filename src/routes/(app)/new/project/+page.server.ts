import { projectSchema } from '$lib/schemas/project-schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import type { PageServerLoad } from './$types';

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

		const { name, description, slug, branch, category } = form.data;

		const formattedDescription = description.replace('\n', '<br/>');

		const { error } = await supabase
			.from('projects')
			.insert({ name, description: formattedDescription, slug, branch, category });

		if (error) {
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}
	}
};
