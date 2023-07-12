<script lang="ts">
    export let currentPage = 'home';
    import { goto } from '$app/navigation';
    import { signOut } from 'firebase/auth';
    import { firebaseAuth } from '$lib/firebase';
    import { authUser } from '$lib/authStore';
    import { onMount } from 'svelte';

    const handleLogout = () => {
      signOut(firebaseAuth)
        .then(() => {
          $authUser = undefined;
          goto('/login');
        }).catch((error) => {
          console.log(error.code);
          console.log(error.message);
        });
    };

    onMount(() => {
      let currentElem = document.getElementById(`bar_${currentPage}`)
      if (currentElem !== null) { currentElem.classList.add('bg-_celestialblue') }
      else { console.log('[DEV / NOT CRITICAL] Current element returned null. Check navbar IDs.') }
    })
</script>

<header class="overflow-auto bg-_jet sticky top-0">
  <nav class="menu float-left flex py-0 text-center">
    <div class="group">
      <a href="/">Home</a>
      <div class="bar group-hover:bg-_royalblue" id="bar_home"></div>
    </div>
    <div class="group">
      <a href="/about">About</a>
      <div class="bar group-hover:bg-_royalblue" id="bar_about"></div>
    </div>
  </nav>
  <div class="menu float-right flex py-0 text-center">
    {#if $authUser}
      <div class="group">
        <a id="dashboard" href="/dashboard">Dashboard</a>
        <div class="bar group-hover:bg-_cerise" id="bar_dashboard"></div>
      </div>
      <div class="group">
        <button on:click={handleLogout}>Logout</button>
        <div class="bar group-hover:bg-_cerise" id="bar_logout"></div>
      </div>
    {:else}
      <div class="group">
        <a id="register" href="/register">Register</a>
        <div class="bar group-hover:bg-_cerise" id="bar_register"></div>
      </div>
      <div class="group">
        <a id="login" href="/login">Login</a>
        <div class="bar group-hover:bg-_cerise" id="bar_login"></div>
      </div>
    {/if}
  </div>
</header>

<style lang="postcss">
  .menu > div { @apply relative w-32 m-0; }
  .bar { @apply absolute bottom-0 w-full h-1 transition; }
  a, button { @apply block w-full h-full z-50 py-4 }
</style>