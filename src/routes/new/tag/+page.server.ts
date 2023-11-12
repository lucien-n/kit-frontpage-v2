import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { tagSchema } from '$lib/schemas/tag-schema';
import { superValidate } from 'sveltekit-superforms/client';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/');
	}

	return {
		form: superValidate(tagSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const {
			locals: { supabase }
		} = event;
		const form = await superValidate(event, tagSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { label, color, link } = form.data;

		const query = supabase.from('tags').insert({ label, color, link }).select();
		const { data, error }: DbResult<typeof query> = await query;

		if (error) {
			return fail(500, {
				error: 'Server error. Try again later.'
			});
		}

		if (data) {
			const [tag] = data;
			return {
				tag
			};
		}
	}
};
