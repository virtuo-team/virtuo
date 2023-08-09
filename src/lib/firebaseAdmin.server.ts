import { cert, initializeApp as initializeAdmin, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccountKey from '$lib/server/firebaseServiceAccountKey.json';

export const adminFirebaseApp = initializeAdmin({
    credential: cert(serviceAccountKey as ServiceAccount)
});
export const adminFirebaseAuth = getAuth();