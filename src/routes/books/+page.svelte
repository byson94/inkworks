<script>
    import Container from '#lib/components/Container.svelte';
    import Navbar from '#lib/components/Navbar.svelte'
    import Footer from '#lib/components/Footer.svelte';
</script>

<Navbar />

<Container>
	<main id="content" class="py-12 md:py-16">
        <div class="prose">
            <h1>Books</h1>
            <p>No books so far.</p>
        </div>
    </main>
</Container>

<Footer />
