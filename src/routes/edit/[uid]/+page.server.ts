import { redirect, type Actions, fail, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { projectSchema } from './schema';
import { superValidate } from 'sveltekit-superforms/client';
import { getProject } from '$lib/server/projects';

export const load: PageServerLoad = async ({
	locals: { getSession, supabase },
	params: { uid }
}) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/');
	}

	const form = await superValidate(projectSchema);

	const project = await getProject(supabase, uid);
	if (!project) throw error(404);

	form.data = project;

	return {
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase },
			params: { uid }
		} = event;
		const form = await superValidate(event, projectSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, description, slug, branch } = form.data;

		const query = supabase
			.from('projects')
			.update({ name, description, slug, branch })
			.match({ uid });
		const { error }: DbResult<typeof query> = await query;

		if (error) {
			console.warn(error);
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}
	}
};
