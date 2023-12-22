<script lang="ts">
	import { auth, googleProvider } from '$lib/firebaseConfig';
	import { signInWithPopup } from 'firebase/auth';
	import { userStore } from 'sveltefire';

	const user = userStore(auth);
</script>

<header class="navbar">
	<div class="navbar-start prose">
		<h1>613 Stanford Dr</h1>
	</div>

	<div class="navbar-center">
		<a class="btn" href="/">Home</a>
		<a class="btn" href="/blog" data-sveltekit-preload-data>Blog</a>
		<a class="btn" href="/pool" data-sveltekit-preload-data>Pool</a>
	</div>

	<div class="navbar-end space-x-1">
		{#if $user}
			<a class="btn-circle" href="/profile">
				<img
					src={$user.photoURL || 'https://source.unsplash.com/random'}
					alt={$user.displayName}
					class="h-12 w-12 rounded-full"
				/>
			</a>
			<button on:click={() => auth.signOut()} class="btn">Log Out</button>
		{:else}
			<button on:click={() => signInWithPopup(auth, googleProvider)} class="btn">
				<i class="fa-brands fa-google fa-xl" style="color: #eb4d27;" />
				Sign In with Google
			</button>
		{/if}
	</div>
</header>
