import type { Actions } from './$types';
import { adminFirebaseAuth } from '$lib/firebaseAdmin.server';
import { db } from '$lib/firebase';
import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';

export const actions = {
    teacherRegister: async (event) => {
        console.log('received')
        const data = await event.request.formData();
        const studentPath = data.get('studentUid')!.toString();
        const studentDocRef = doc(db, studentPath);
        getDoc(studentDocRef).then(studentDoc => {
            if (!studentDoc.get('teacher')) {
                adminFirebaseAuth.getUserByEmail(data.get('teacherEmail')!.toString()).then(user => {
                    updateDoc(doc(db, "users", user.uid), {
                        awaitingApproval: arrayUnion(studentDocRef.path)
                    }).then(() => {
                        updateDoc(studentDocRef, {
                            teacher: 'awaiting'
                        })
                    })
                }).catch(studentRefError => { console.log('oops'); }) //i'll deal with this later
            }
        }).catch(studentDocError => {
            console.log('something went wrong with student doc retrieval')
        })
    }
} satisfies Actions;