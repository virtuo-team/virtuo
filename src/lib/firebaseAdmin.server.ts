import { cert, initializeApp as initializeAdmin, type ServiceAccount } from 'firebase-admin/app';
import serviceAccountKey from '$lib/server/firebaseServiceAccountKey.json';

export const firebaseAdmin = initializeAdmin({
    credential: cert(serviceAccountKey as ServiceAccount)
});