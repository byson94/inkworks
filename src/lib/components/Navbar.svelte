<script>
	import { page } from '$app/state';

	const links = [
		{ href: '/books', label: 'Books' },
		{ href: '/poems', label: 'Poems' },
		{ href: '/about', label: 'About' }
	];

	let open = $state(false);

	const isActive = (href) => page.url.pathname.startsWith(href);
	const close = () => (open = false);

	$effect(() => {
		page.url.pathname;
		open = false;
	});
</script>

<header class="relative z-50 border-b border-current/10">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
		<a
			href="/"
			onclick={close}
			class="font-serif text-xl font-bold tracking-tight transition-colors hover:text-(--accent)"
		>
			Nilay Byju
		</a>

		<button
			type="button"
			onclick={() => (open = !open)}
			class="-mr-2 cursor-pointer px-2 py-2 transition-colors hover:text-(--accent) md:hidden"
		>
			{open ? 'Close' : 'Menu'}
		</button>

		<nav
			id="main-nav"
			aria-label="Main"
			class="{open ? 'block' : 'hidden'} absolute left-0 top-full w-full border-b border-current/10
				bg-(--bg-color) md:static md:block md:w-auto md:border-0 md:bg-transparent"
		>
			<ul class="flex flex-col px-4 py-2 md:flex-row md:gap-6 md:p-0">
				{#each links as { href, label }}
					<li>
						<a
							{href}
							onclick={close}
							aria-current={isActive(href) ? 'page' : undefined}
							class="block py-3 text-lg font-bold underline-offset-4 decoration-(--accent) decoration-dotted
								transition-colors md:py-2
								{isActive(href) ? 'text-(--accent) underline' : 'hover:text-(--accent) hover:underline'}"
						>
							{label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>
