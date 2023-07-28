<script>
	import Footer from '$lib/components/Footer.svelte';
    import Nav from '$lib/components/Nav.svelte';
</script>

<Nav currentPage="about"/>
<div class="main">
    <h1>Latest InDev Updates</h1>
    <p>Virtuo InDev v0.1.0 was released on 09/07/23.</p>
    <ul>
        <li>Authentication routes (log in, register, log out) fully functional</li>
        <li>Added footer in bottom-left corner</li>
        <li>Added Virtuo's Offical Mascot: Le Baguette</li>
    </ul>
</div>
<Footer />

<style lang="postcss">
    li { @apply list-disc; }
</style>