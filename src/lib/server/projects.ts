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
