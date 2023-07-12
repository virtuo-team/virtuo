<script>
    import Nav from '$lib/components/Nav.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import VirtuoFull from '$lib/svg/VirtuoFull.svelte';
</script>

<svelte:head>
  <title>Virtuo: Home</title>
</svelte:head>

<Nav />
<div class="main">
    <VirtuoFull style="h-24 mx-auto" />
    <h2>Welcome to Virtuo InDev.</h2>
    <p class="w-4/5 mx-auto">
        We're delighted to have you as a tester during our InDev stage.<br />
        Please be aware that changes are being rolled out live on the dev server, so things may break as you are using them.<br />
        While we appreciate your help in testing features, finding bugs and resolving security errors, <b class="text-lg">please do not try to intentionally damage any of the server-side infrastructure</b>.
    </p>
</div>
<Footer />
