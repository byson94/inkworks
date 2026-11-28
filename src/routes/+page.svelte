<script>
	import { onMount } from 'svelte';
	import Container from '#lib/components/Container.svelte';
	import Navbar from '#lib/components/Navbar.svelte';
	import Footer from '#lib/components/Footer.svelte';

	let { data } = $props();

	let index = $state(0);
	let ready = $state(false);

	onMount(() => {
		index = Math.floor(Math.random() * data.poems.length);
		ready = true;
	});

	const hero = $derived(data.poems[index]);
</script>

<svelte:head>
	<title>Nilay Byju</title>
</svelte:head>

<Navbar />

<Container>
	<main id="content" class="py-16 md:py-28">
		{#if hero}
			<section class="transition-opacity duration-500 {ready ? 'opacity-100' : 'opacity-0'}">
				<p class="text-sm uppercase tracking-widest text-(--accent)">Poems &amp; novels</p>

				<h1 class="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{hero.title}</h1>

				<div
					class="prose mt-8 max-h-80 max-w-prose overflow-hidden whitespace-pre-line font-serif text-xl leading-relaxed md:text-2xl
						[mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
				>
					<hero.content />
				</div>

				<div class="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3 prose">
					<a
						href="/poems/{hero.slug}"
						class="cursor-pointer font-semibold text-(--accent) underline underline-offset-4 transition-colors hover:opacity-80"
					>
						Read the full poem &rArr;
					</a>
					<a
						href="/poems"
						class="cursor-pointer underline decoration-current/30 underline-offset-4 transition-colors hover:text-(--accent) hover:decoration-(--accent)"
					>
						More poems
					</a>
					<a
						href="/about"
						class="cursor-pointer underline decoration-current/30 underline-offset-4 transition-colors hover:text-(--accent) hover:decoration-(--accent)"
					>
						About
					</a>
				</div>
			</section>
		{/if}
	</main>
</Container>

<Footer />
