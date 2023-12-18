<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { authStore } from '../store/store';
	import type { User } from 'firebase/auth';
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
						dbUser: null
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
							dbUser: dbUser
						};
					});
				}
			}
		});
		return unsubscribe;
	});

	let googleUser: User | null;
	let dbUser: TUser | null;
	authStore.subscribe((value) => {
		googleUser = value.googleUser;
		dbUser = value.dbUser;
	});
</script>

<div>
	{#if googleUser && dbUser}
		<Navbar />
	{/if}
	<slot />
</div>
