export type Link = {
	link: string;
	icon?: string;
	label?: string;
};

export type Project = {
	uid: string;
	name: string;
	description: string;
	slug: string;
	branch: string;
};
