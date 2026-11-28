import { error } from '@sveltejs/kit';

export async function load() {
	try {
		const globbedBooks = import.meta.glob('#lib/books/*.md', { eager: true });

		const books = Object.entries(globbedBooks).map(([filepath, post]) => {
			const slug = filepath.split('/').pop().replace('.md', '');

			return {
				slug,
				...post.metadata
			};
		});

		books.sort((a, b) => new Date(b.meta?.date) - new Date(a.meta?.date));

        return {
            books
        };
	} catch (e) {
		error(500, 'Could not fetch books');
	}
}



