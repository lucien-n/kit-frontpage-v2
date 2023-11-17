import type { RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params: { uid }, locals: { supabase } }) => {
	const query = supabase
		.from('projects')
		.delete()
		.eq('uid', uid as string);

	const { error }: DbResult<typeof query> = await query;

	if (error) {
		console.error(error);
		return new Response(null, { status: 500 });
	}

	return new Response(null, { status: 204 });
};

export const GET: RequestHandler = async ({ params: { uid }, locals: { supabase } }) => {
	const query = supabase
		.from('projects')
		.select('*')
		.eq('uid', uid as string);

	const { data, error }: DbResult<typeof query> = await query;

	if (error) {
		console.error(error);
		return new Response(null, { status: 500 });
	}

	if (!data.length) return new Response(null, { status: 404 });

	const project = data[0];
	return new Response(JSON.stringify(project), { status: 200 });
};
