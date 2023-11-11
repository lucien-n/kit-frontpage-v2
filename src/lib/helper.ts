import { titleStore } from './stores';

export const setTitle = (newTitle: string, prefix: boolean = false) => {
	titleStore.set((prefix || '') + newTitle);
};

export const toInitials = (name: string, separator: string = ' ') =>
	name
		.split(separator)
		.slice(0, 2)
		.map((word) => word[0])
		.join('')
		.toUpperCase();
