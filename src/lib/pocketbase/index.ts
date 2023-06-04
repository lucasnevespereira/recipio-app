import PocketBase from 'pocketbase';
import {PUBLIC_PB_ADMIN_URL} from '$env/static/public'
import {writable} from "svelte/store";

export const pb = new PocketBase(PUBLIC_PB_ADMIN_URL)

export const currentUser = writable(pb.authStore.model);

// listen to pocketbase user events, pocketbase user model changes when users signs in or logout
// we can listen to these events and update our svelte store
pb.authStore.onChange(() => currentUser.set(pb.authStore.model));

export async function login(username: string, password: string) {
    await pb.collection('users').authWithPassword(username, password)
    // window.location.href = "/"
    // navigate("/", {replace: true})
}





