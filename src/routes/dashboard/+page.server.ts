import type { Actions } from './$types';
import { adminFirebaseAuth } from '$lib/firebaseAdmin.server';

export const actions = {
    teacherRegister: async (event) => {
        console.log('received')
        const data = await event.request.formData();
        const teacherEmail = await adminFirebaseAuth.getUserByEmail(data.get('teacherEmail')?.toString()!)
        console.log(teacherEmail);
    }
} satisfies Actions;