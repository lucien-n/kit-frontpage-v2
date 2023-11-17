import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params: { uid }, locals: { supabase } }) => {
	console.log(uid);

	const query = supabase
		.from('projects')
		.delete()
		.eq('uid', uid as string);

	const { data, error }: DbResult<typeof query> = await query;

	console.log(data, error);

	if (error) {
		return new Response(null, { status: 500 });
	}

	return new Response(null, { status: 204 });
};
