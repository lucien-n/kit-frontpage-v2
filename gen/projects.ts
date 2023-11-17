import type { SupabaseClient } from '@supabase/supabase-js';
import type { Project } from '../src/lib/types';
import dotenv from 'dotenv';
dotenv.config();

const technologies = ['Sveltekit', 'Angular', 'Vue', 'React', 'Next', 'Nest', 'Go', 'Python'];
const branches = ['main', 'dev'];

export const genProjects = async (supabase: SupabaseClient, amount: number = 5) => {
	await supabase
		.from('projects')
		.delete()
		.range(0, 999)
		.order('created_at')
		.ilike('name', '%Project%');

	const projects: any[] = [];

	for (let i = 1; i <= amount; i++) {
		const technology = technologies[Math.floor(Math.random() * technologies.length)];
		const branch = branches[Math.floor(Math.random() * branches.length)];

		const project: Project = {
			name: `Project №${i}`,
			description: `This project was made using ${technology}`,
			branch,
			slug: `${technology.toLowerCase()}-${i}`
		} as Project;

		const query = supabase.from('projects').insert(project).select();
		const { data, error } = await query;

		if (error) throw new Error(`[${error.code}] (${error.hint}) ${error.message}`);

		if (data.length) projects.push(data[0]);
	}

	return projects;
};
