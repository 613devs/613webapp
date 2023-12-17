import { auth, db, googleProvider } from '$lib/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { goto } from '$app/navigation';
import type { TUser } from '../types';

export const authStore = writable<{
	googleUser: User | null;
	dbUser: TUser | null;
}>({
	googleUser: null,
	dbUser: null
});

export const authHandlers = {
	logout: async () => {
		await auth.signOut();
		authStore.set({
			googleUser: null,
			dbUser: null
		});
		goto('/');
	},
	loginWithGoogle: async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const googleUser = result.user;
        const docRef = doc(db, 'users', googleUser.uid);

        // Check if a document for this user already exists
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            // Create a new document for this user
			const firstName = googleUser.displayName?.split(' ')[0] ?? 'Anonymous';
			const newUser : TUser = {
				userNickname: firstName,
				userRole: "member",
				userRating: 1000,
			}
            await setDoc(docRef, newUser);
        }
		// Fetch the user document and update the authStore
        const dbUser = (await getDoc(docRef)).data() as TUser;
        authStore.set({ googleUser, dbUser });

        goto('/home');
    }
};