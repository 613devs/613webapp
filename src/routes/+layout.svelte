<script lang="ts">
	import '../app.css';
	import { FirebaseApp } from 'sveltefire';
	import { auth } from '$lib/firebaseConfig';
	import { firestore } from '$lib/firebaseConfig';
	import Navbar from '../components/Navbar.svelte';
</script>

<FirebaseApp {auth} {firestore}>
	<Navbar />
	<slot />
</FirebaseApp>
