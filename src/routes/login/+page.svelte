<script lang="ts">
    import { goto } from '$app/navigation';
    import Nav from '$lib/components/Nav.svelte';
    import VirtuoFull from '$lib/svg/VirtuoFull.svelte';
    import Loading from '$lib/svg/Loading.svelte';
    import { signInWithEmailAndPassword } from 'firebase/auth';
    import { firebaseAuth } from '$lib/firebase';
    import { authUser } from '$lib/authStore';
   
    let email: string;
    let password: string;
    let submitting: boolean = false;
    let success: boolean | undefined = undefined;
    let error: Error;
 
    const login = () => {
        submitting = true;
        signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            $authUser = {
                uid: userCredential.user.uid,
                email: userCredential.user.email || ''
            };
            goto('/dashboard');
        }).catch((e) => {
            submitting = false;
            success = false;
            error = e;
        });
    };
</script>

<Nav currentPage='login'/>
<div class="main">
    <div class="mx-auto p-8 bg-_jet rounded-3xl">
        <VirtuoFull style="h-24 mx-auto"/>
        <h2>Welcome back!</h2>
        <form class="text-center px-8 pt-8" on:submit|preventDefault={login}>
            <div class="flex gap-2 mb-4">
                <input name="email" type="email" placeholder="Email" required bind:value={email}/>
                <input name="password" type="password" placeholder="Password" required bind:value={password}/>
            </div>
            <button class="rounded-2xl mx-auto bg-_cerise px-4 py-2" type="submit">
                {#if submitting}
                    <Loading style="inline-block h-4"/>
                    Logging in
                {:else} Log in
                {/if}
            </button>
        </form>
        {#if success === false}
            <div class="w-[48rem] m-4">
                <p class="text-xl">There was an error. Please check your details and try again.</p>
                <p class="text-red-600">{error.message}</p>
            </div>
        {/if}
    </div>
</div>

<style>
    input[type=email], input[type=password] { @apply rounded-2xl mx-auto p-2 w-96 bg-_eerieblack border-_eerieblack border-2; }
    input:focus { @apply outline-none border-_celestialblue; }
</style>