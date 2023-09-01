<script lang="ts">
	import type { DocumentSnapshot } from 'firebase/firestore';
    import { enhance } from '$app/forms';
    export let userDoc: DocumentSnapshot;

    let teacherEmail: string;
    let studentDocRef = userDoc.ref.path;
</script>

{#if userDoc.get('teacher')}
    <h1>You've practiced for {userDoc.get('practiceMins')} minutes today</h1>
    <h2>Your Tasks:</h2>
    <h3>This section is coming soon!</h3>
{:else}
    <div class="mx-auto p-8 bg-_jet rounded-3xl">
        <h1>Register under a teacher</h1>
        <form class="text-center px-8 pt-8" method="POST" action="?/teacherRegister" use:enhance>
            <div class="flex gap-2 mb-4">
                <input name="studentUid" type="hidden" placeholder="Student User ID" bind:value={studentDocRef}/>
                <input name="teacherEmail" type="email" placeholder="Teacher's Email" required bind:value={teacherEmail}
                    class="rounded-2xl mx-auto p-2 w-96 bg-_eerieblack border-_eerieblack border-2 focus:outline-none focus:border-_celestialblue"/>
                <button class="rounded-2xl mx-auto bg-_cerise px-4 py-2" type="submit">
                    Confirm and register
                </button>
            </div>
        </form>
    </div>
{/if}

