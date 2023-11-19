import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from 'lucide-svelte';

export const getProject = async (
	supabase: SupabaseClient<Database>,
	uid: string
): Promise<TProject | null> => {
	const query = supabase.from('projects').select().match({ uid });
	const { data, error }: DbResult<typeof query> = await query;

	if (error) throw error;

	const [projectData] = data;
	if (projectData satisfies TProject) return projectData;

	return null;
};

export const getProjects = async (
	supabase: SupabaseClient<Database>,
	limit: number = 0,
	offset: number = 0,
	match?: object
): Promise<TProject[] | null> => {
	const query = supabase.from('projects').select();
	if (match) query.match(match);
	if (limit) query.range(offset, limit + offset);

	const { data, error }: DbResult<typeof query> = await query;

	if (error) throw error;

	if (data satisfies TProject[]) {
		return data;
	}

	return null;
};
