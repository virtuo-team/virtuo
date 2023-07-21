import { writable } from 'svelte/store';

interface AuthUser {
  uid: string;
  email: string;
}

export const authUser = writable<AuthUser | undefined>(undefined);