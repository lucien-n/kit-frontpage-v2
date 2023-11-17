import { createClient } from '@supabase/supabase-js';

import { genProjects } from './projects.ts';

export const getSupabase = () => {
	const url = process.env.PUBLIC_SUPA_URL;
	const key = process.env.PRIVATE_SUPA_SERVICE_ROLE_KEY;

	if (!url) throw new Error('Could not find PUBLIC_SUPA_URL');
	if (!key) throw new Error('Could not find PRIVATE_SUPA_SERVICE_ROLE_KEY');

	return createClient(url, key);
};

const gen = async () => {
	const supabase = getSupabase();

	const projects = await genProjects(supabase);
	console.info(`Generated ${projects.length} projects`);
};

gen();
