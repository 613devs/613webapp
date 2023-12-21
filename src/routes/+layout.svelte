<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { authStore } from '../store/store';
	import { auth } from '$lib/firebaseConfig';
	import { doc, getDoc } from 'firebase/firestore';
	import { db } from '$lib/firebaseConfig';
	import type { TUser } from '../types';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (!user) {
				authStore.update(() => {
					return {
						googleUser: null,
						dbUser: null,
					};
				});
			} else {
				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const dbUser = docSnap.data() as TUser;
					authStore.update(() => {
						return {
							googleUser: user,
							dbUser: dbUser,
						};
					});
				}
			}
		});
		return unsubscribe;
	});
</script>

<div>
	<Navbar />
	<slot />
</div>
