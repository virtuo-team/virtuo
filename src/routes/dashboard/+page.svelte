<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Loading from '$lib/svg/Loading.svelte';
  import { firebaseAuth, db } from '$lib/firebase';
  import { doc, getDoc } from 'firebase/firestore';

  let accountType: string | undefined = undefined;
  let user = firebaseAuth.currentUser!;

  getDoc(doc(db, "users", user.uid))
</script>

<svelte:head>
  <title>Virtuo Dashboard</title>
</svelte:head>

<Nav currentPage='dashboard'/>

<div class="main">
  <h2 class="text-4xl">Welcome, {user.displayName}</h2>
  {#if accountType =='student'}
    <h1>Student Dash</h1>
    <h2>Placeholder</h2>
  {:else if accountType =='teacher'}
    <h1>Teacher Dash</h1>
    <h2>Placeholder</h2>
  {:else}
    <Loading style="h-24"/>
    <h1>Loading dashboard...</h1>
  {/if}
</div>
