import { z } from 'zod';

export const projectSchema = z.object({
	name: z
		.string()
		.min(3, 'Name must be greater than 3 characters long')
		.max(80, 'Name must be less than 80 characters long'),
	category: z
		.string()
		.min(3, 'Category must be greater than 3 characters long')
		.max(80, 'Category must be less than 80 characters long'),
	description: z
		.string()
		.min(3, 'Name must be greater than 3 characters long')
		.max(512, 'Name must be less than 80 characters long'),
	slug: z
		.string()
		.min(3, 'Github slug must be greater than 3 characters long')
		.max(80, 'Github slug must be less than 80 characters long'),
	branch: z
		.string()
		.min(3, 'Branch must be greater than 3 characters long')
		.max(80, 'Branch must be less than 80 characters long')
});

export type ProjectSchema = typeof projectSchema;
