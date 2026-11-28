import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
        const globbedPoems = import.meta.glob('#lib/poems/*.md', { eager: true });
		const work = await import(`#lib/poems/${params.slug}.md`);
		const rawPost = await import(`#lib/poems/${params.slug}.md?raw`);
        const allPoems = Object.entries(globbedPoems).map(([path, mod]: [string, any]) => {
            const slug = path.split('/').pop()?.replace('.md', '');
            return { slug, ...mod.metadata };
        });

		return {
			content: work.default,
			meta: work.metadata,
            slug: params.slug,
            allPoems
		};
	} catch (e) {
		error(404, `Could not find poems: ${params.slug}`);
	}
}


