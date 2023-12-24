<script lang="ts">
	import '../app.css';
	import { FirebaseApp } from 'sveltefire';
	import Navbar from '../components/Navbar.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { writable } from 'svelte/store';
	import { auth, firestore, rtdb, storage } from '$lib/firebase';

	const isAuthLoading = writable(true);
	onAuthStateChanged(auth, () => {
		isAuthLoading.set(false);
	});
</script>

{#if $isAuthLoading}
	<progress class="progress" />
{:else}
	<FirebaseApp {firestore} {auth} {rtdb} {storage}>
		<Navbar />
		<slot />
	</FirebaseApp>
{/if}
