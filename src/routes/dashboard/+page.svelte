<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Loading from '$lib/svg/Loading.svelte';
	import Student from '$lib/components/dashboards/Student.svelte';
  import Teacher from '$lib/components/dashboards/Teacher.svelte';
  import { firebaseAuth, db } from '$lib/firebase';
  import { doc, getDoc } from 'firebase/firestore';
	import ErrorHandler from '$lib/components/ErrorHandler.svelte';

  let accountType: string | undefined | null = undefined;
  let user = firebaseAuth.currentUser!;
  let error: Error | undefined = undefined;
  let actionMessage: string = "";

  getDoc(doc(db, "users", user.uid)).then(document => {
    if (document.exists()) { accountType = document.get('type'); }
    else { accountType = null; }
  }).catch((e) => {
    error = e;
    actionMessage = "Please email support."
  })
</script>

<svelte:head>
  <title>Virtuo Dashboard</title>
</svelte:head>

<Nav currentPage='dashboard'/>

<div class="main">
  <h2 class="text-4xl">Welcome, {user.displayName}</h2>
  {#if accountType === 'student'} <Student />
  {:else if accountType === 'teacher'} <Teacher />
  {:else if accountType === undefined}
    <Loading style="h-24"/>
    <h2>Loading dashboard...</h2>
  {/if}
  <ErrorHandler {error} {actionMessage}/>
</div>
