//TODO: Server-generated random token to improve the security of auth persistence

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface AuthUser {
  uid: string;
  email: string;
}

const uid = browser ? localStorage.getItem('virtuo_uid') : null
const email = browser ? localStorage.getItem('virtuo_email') : null

const user = (!uid || !email) ? undefined : {
  uid: uid,
  email: email
}

export const authUser = writable<AuthUser | undefined>(user);

authUser.subscribe(value => {
  if (browser) {
    if (!value) { localStorage.clear(); } else {
      localStorage.setItem('virtuo_uid', value!.uid);
      localStorage.setItem('virtuo_email', value!.email);
    }
  }
});