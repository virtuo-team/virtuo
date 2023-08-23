import type { Actions } from './$types';
import { adminFirebaseAuth } from '$lib/firebaseAdmin.server';
import { db } from '$lib/firebase';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';

export const actions = {
    teacherRegister: async (event) => {
        console.log('received')
        const data = await event.request.formData();
        console.log(data);
        adminFirebaseAuth.getUserByEmail(data.get('teacherEmail')!.toString()).then(user => {
            updateDoc(doc(db, "users", user.uid), {
                awaitingApproval: arrayUnion(data.get('studentUid'))
            })
        }).catch(e => {
            console.log(e); //brain: not working
        })
    }
} satisfies Actions;