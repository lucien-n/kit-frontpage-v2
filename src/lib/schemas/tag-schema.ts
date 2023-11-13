import { z } from 'zod';

export const tagSchema = z.object({
	label: z
		.string()
		.min(3, 'Name must be greater than 3 characters long')
		.max(24, 'Name must be less than 24 characters long'),
	link: z.string().optional(),
	color: z.string().length(6, 'Please enter a valid hex value')
});

export type TagSchema = typeof tagSchema;
