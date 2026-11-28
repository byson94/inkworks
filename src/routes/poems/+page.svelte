<script>
	import Container from '#lib/components/Container.svelte';
	import Navbar from '#lib/components/Navbar.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { data } = $props();

	let sortOrder = $state('newest');
	let selectedCollection = $state(null);

	function formatDate(dateString) {
		if (!dateString) return '';
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		}).format(new Date(dateString));
	}

	const collections = $derived(
		[...new Set(data.poems.map((p) => p.collection).filter(Boolean))].sort()
	);

	const visiblePoems = $derived.by(() => {
		const list = selectedCollection
			? data.poems.filter((p) => p.collection === selectedCollection)
			: [...data.poems];

		return list.sort((a, b) => {
			const diff = new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
			return sortOrder === 'newest' ? diff : -diff;
		});
	});

    const filterClass = (active) =>
        `cursor-pointer decoration-dotted underline-offset-4 transition-colors hover:text-(--accent) ${
            active ? 'text-(--accent) underline' : 'underline decoration-current/30 hover:decoration-(--accent)'
        }`;

	const toggleSort = () => (sortOrder = sortOrder === 'newest' ? 'oldest' : 'newest');
</script>

<svelte:head>
	<title>Poems | Nilay Byju</title>
</svelte:head>

<Navbar />

<Container>
	<main id="content" class="py-12 md:py-16">
        <div class="prose">
            <h1>Poems</h1>
        </div>

        <div class="mt-10 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-x-6">
            {#if collections.length > 0}
                <div class="flex flex-wrap gap-x-5 gap-y-1">
                    <button
                        type="button"
                        onclick={() => (selectedCollection = null)}
                        class="py-2 {filterClass(selectedCollection === null)}"
                    >
                        All
                    </button>
                    {#each collections as name}
                        <button
                            type="button"
                            onclick={() => (selectedCollection = name)}
                            class="py-2 {filterClass(selectedCollection === name)}"
                        >
                            {name}
                        </button>
                    {/each}
                </div>
            {/if}

            <div class="flex items-center justify-between gap-4 sm:ml-auto sm:justify-start">
                <span class="opacity-70">
                    {visiblePoems.length}
                    {visiblePoems.length === 1 ? 'poem' : 'poems'}
                </span>
                <button
                    type="button"
                    onclick={toggleSort}
                    class="cursor-pointer whitespace-nowrap py-2 underline decoration-dotted decoration-current/30 underline-offset-4 transition-colors hover:text-(--accent) hover:decoration-(--accent)"
                >
                    {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
                </button>
            </div>
        </div>

		<ul class="mt-6 border-t border-current/10">
			{#each visiblePoems as poem (poem.slug)}
				<li class="border-b border-current/10">
					<a
						href="/poems/{poem.slug}"
						class="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
					>
						<span class="min-w-0">
							<span class="block text-lg font-semibold transition-colors group-hover:text-(--accent)">
								{poem.title}
							</span>
							{#if poem.collection}
								<span class="mt-0.5 block text-xs uppercase tracking-widest opacity-60">
									{poem.collection}
								</span>
							{/if}
						</span>

						{#if poem.date}
							<time datetime={poem.date} class="shrink-0 text-sm opacity-60">
								{formatDate(poem.date)}
							</time>
						{/if}
					</a>
				</li>
			{:else}
				<li class="py-10 italic opacity-60">No poems here yet.</li>
			{/each}
		</ul>
	</main>
</Container>

<Footer />
