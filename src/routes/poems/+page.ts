import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const globbedPoems = import.meta.glob('#lib/poems/*.md', { eager: true });

		const poems = Object.entries(globbedPoems).map(([filepath, post]) => {
			const slug = filepath.split('/').pop().replace('.md', '');

			return {
				slug,
				...post.metadata
			};
		});

		poems.sort((a, b) => new Date(b.meta?.date) - new Date(a.meta?.date));

        return {
            poems
        };
	} catch (e) {
		error(500, 'Could not fetch poems');
	}
}


