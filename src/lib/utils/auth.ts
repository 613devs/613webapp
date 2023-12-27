import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { TProfile } from '../../types';
import { auth, firestore } from '$lib/firebase';
import { goto } from '$app/navigation';

export const login = async () => {
	const userResult = await signInWithPopup(auth, new GoogleAuthProvider());

	const profileRef = doc(firestore, 'profiles', userResult.user?.uid);
	const profileSnap = await getDoc(profileRef);

	if (!profileSnap.exists()) {
		const newProfile: TProfile = {
			username: userResult.user?.displayName || 'Anonymous',
			role: 'member',
			created_dt: new Date(),
		};
		await setDoc(profileRef, newProfile);
	}
};

export const logout = async () => {
	await auth.signOut();
	goto('/');
};
