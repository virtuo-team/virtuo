<script lang="ts">
    import Nav from '$lib/components/Nav.svelte';
    import VirtuoFull from '$lib/svg/VirtuoFull.svelte';
    import Loading from '$lib/svg/Loading.svelte';
    import { goto } from '$app/navigation';
    import { createUserWithEmailAndPassword, deleteUser, updateProfile } from 'firebase/auth';
    import { doc, setDoc } from 'firebase/firestore';
    import { firebaseAuth, db } from '$lib/firebase';
	import ErrorHandler from '$lib/components/ErrorHandler.svelte';

    //Form fields
    let email: string;
    let password: string;
    let fname: string;
    let lname: string;
    let type: keyof typeof initStructure;
    let dobMonth: number;
    let dobYear: string;

    //Server-side error handling
    let submitting: boolean = false;
    let error: Error | undefined = undefined;
    let actionMessage: string = "";

    //Form elements
    let section1: HTMLDivElement;
    let section2: HTMLDivElement;
    let regform: HTMLFormElement;

    //Animations
    let currentSection: number = 1;
    const fade = [ { opacity: 0 }, { opacity: 1 } ];
    const fadeOut = [ { opacity: 1 }, { opacity: 0 } ];
    const fadeOpts: KeyframeEffectOptions = { duration: 500, fill: "forwards" };

    //Database document structure
    const initStructure = {
        student: {
            type: 'student',
            teacher: null,
            completedTasks: [],
            assignedTasks: [],
            practicedToday: false,
            lastPracticeCheck: null,
        },
        teacher: {
            type: 'teacher',
            students: []
        }
    }

    const register = () => {
        submitting = true;
        createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            updateProfile(userCredential.user, { displayName: `${fname} ${lname}` });
            setDoc(doc(db, "users", userCredential.user.uid), initStructure[type]).then(() => {
                goto('/login');
            }).catch((e) => {
                submitting = false;
                actionMessage = 'Attempting to reset, please wait...'
                error = e;

                //Revert user creation
                deleteUser(userCredential.user).then(() => {
                    actionMessage = 'Please check your details and try again.'
                }).catch((e) => {
                    actionMessage = 'Please email support.'
                    error = e;
                });
            })
        }).catch((e) => {
            submitting = false;
            actionMessage = 'Please check your details and try again.'
            error = e;
        });
    };
</script>

<Nav currentPage='register'/>
<div class="main">
    <div class="mx-auto p-8 bg-_jet rounded-3xl">
        <VirtuoFull style="h-24 mx-auto"/>
        <h2>Never forget to practice again.</h2>
        <form class="text-center px-8 pt-8" bind:this={regform} on:submit|preventDefault={register}>
            <div class="section" bind:this={section1}>
                <div class="row gap-2">
                    <input name="email" type="email" placeholder="Email" required bind:value={email}/>
                    <input name="password" type="password" placeholder="Password" required bind:value={password}/>
                </div>
                <button type="button" class="bg-_cerise" on:click={() => {
                    if (regform.checkValidity()) {
                        let fo = section1.animate(fadeOut, fadeOpts)
                        currentSection = 2;
                        fo.onfinish = () => {
                            section1.style.display='none';
                            section2.style.display='block';
                            section2.animate(fade, fadeOpts);
                        }
                    } else {
                        regform.reportValidity();
                    }
                }}>Continue</button>
            </div>
            {#if currentSection === 2}
                <div class="section hidden" bind:this={section2}>
                    <div class="row gap-2">
                        <input name="fname" type="text" placeholder="First Name" required bind:value={fname}/>
                        <input name="lname" type="text" placeholder="Last Name" required bind:value={lname}/>
                    </div>

                    <div id="type" class="row gap-6">
                        <p>I am a...</p>

                        <input id="student" name="type" type="radio" value="student" bind:group={type} required/>
                        <label for="student">Student</label>

                        <input id="parent" name="type" type="radio" value="parent" bind:group={type} required/>
                        <label for="parent">Parent</label>

                        <input id="teacher" name="type" type="radio" value="teacher" bind:group={type} required/>
                        <label for="teacher">Teacher</label>
                    </div>
                    
                    <div class="row float-left gap-6">
                        <p>Date of birth:</p>
                        <select name="dobMonth" required bind:value={dobMonth}>
                            <option value=1>January</option>
                            <option value=2>February</option>
                            <option value=3>March</option>
                            <option value=4>April</option>
                            <option value=5>May</option>
                            <option value=6>June</option>
                            <option value=7>July</option>
                            <option value=8>August</option>
                            <option value=9>September</option>
                            <option value=10>October</option>
                            <option value=11>November</option>
                            <option value=12>December</option>
                        </select>
                        <input name="dobYear" type="tel" placeholder="YEAR" required maxlength="4" pattern="^\d+$" bind:value={dobYear}
                        class="bg-_eerieblack py-2 pr-2 pl-3 tracking-[1rem] w-28 inline-block rounded-2xl border-2 border-_eerieblack"
                        on:input={(e) => {
                            dobYear = dobYear.replace(/\D/g,'');
                            let elem = e.currentTarget;
                            if (elem.value.length >= 4) {
                                let val = Number(elem.value);
                                if (val < 1900 || val > 2023) { elem.setCustomValidity('Number must be between 1900 and 2023') }
                                elem.select();
                                elem.blur();
                            } else { elem.setCustomValidity(""); }
                        }}/>
                    </div>
                    <div class="row float-right gap-4">
                        <button class="bg-_royalblue" type="button" on:click={() => {
                            let fo = section2.animate(fadeOut, fadeOpts);
                            fo.onfinish = () => {
                                section2.style.display='none';
                                section1.style.display='block';
                                section1.animate(fade, fadeOpts);
                                currentSection = 1;
                            }
                        }}>Previous</button>
                        <button class="bg-_cerise" type="submit">
                            {#if submitting}
                                <Loading style="inline-block h-4"/>
                                Registering
                            {:else} Register
                            {/if}
                        </button>
                    </div>
                    <ErrorHandler {error} {actionMessage}/>
                </div>
            {/if}
        </form>
    </div>
</div>

<style lang="postcss">
    @keyframes -global-fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes -global-fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    input[type=text], input[type=email], input[type=password] { @apply rounded-2xl mx-auto p-2 w-96 bg-_eerieblack border-_eerieblack border-2; }
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { @apply appearance-none m-0; }
    p { @apply my-auto text-left w-32 p-2; }
    label, select { @apply bg-_eerieblack p-2 rounded-2xl w-48 border-_eerieblack border-2; }
    input[type=radio] { @apply hidden; }
    input:focus, input[type=radio]:checked+label, select:focus { @apply outline-none border-_celestialblue; }
    button { @apply rounded-2xl mx-auto px-4 py-2; }
    .row { @apply flex justify-center align-middle mb-4; }
</style>