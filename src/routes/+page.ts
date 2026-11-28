import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const globbedPoems = import.meta.glob('#lib/poems/*.md', { eager: true });

	const poems = (Object.entries(globbedPoems) as [string, any][])
		.map(([path, mod]) => ({
			slug: path.split('/').pop()!.replace('.md', ''),
			content: mod.default,
			...mod.metadata
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { poems };
};
