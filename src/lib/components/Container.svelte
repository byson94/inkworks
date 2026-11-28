<script>
	let { children } = $props();
</script>

<div
	class="mx-auto max-w-6xl px-4 py-4"
>
    {#if children}
    	{@render children()}
    {/if}
</div>

