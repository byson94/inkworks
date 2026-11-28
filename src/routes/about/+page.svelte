<script>
	import Container from '#lib/components/Container.svelte';
	import Navbar from '#lib/components/Navbar.svelte';
	import Footer from '#lib/components/Footer.svelte';
    import About from '#lib/about.md';
</script>

<Navbar />

<Container>
    <div class="prose py-12 md:py-16">
        <About />
    </div>
</Container>

<Footer />

