<script lang="ts">
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
	import { connectAuthEmulator, getAuth } from 'firebase/auth';
	import { getDatabase } from 'firebase/database';
	import { getStorage } from 'firebase/storage';

	const app = initializeApp({
		apiKey: import.meta.env.VITE_API_KEY,
		authDomain: import.meta.env.VITE_AUTH_DOMAIN,
		projectId: import.meta.env.VITE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
		appId: import.meta.env.VITE_APP_ID,
		measurementId: import.meta.env.VITE_MEASUREMENT_ID,
	});
	const firestore = getFirestore(app);
	const auth = getAuth(app);
	if (typeof location !== 'undefined' && location.hostname === 'localhost') {
		connectFirestoreEmulator(firestore, 'localhost', 8080);
		connectAuthEmulator(auth, 'http://localhost:9099');
	}
	const rtdb = getDatabase(app);
	const storage = getStorage(app);
</script>

<FirebaseApp {firestore} {auth} {rtdb} {storage}>
	<Navbar />
	<slot />
</FirebaseApp>
