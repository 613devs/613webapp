<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { getFirebaseContext, userStore, docStore } from 'sveltefire';
	import type { TUser } from '../types';

	const { auth, firestore } = getFirebaseContext();
	const user = userStore(auth!);
	let dbUser: DocStore<TUser>;

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth!, new GoogleAuthProvider());
			// Check if dbUser already exists
			const docRef = doc(firestore!, 'users', $user!.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				// Create new user
				const firstName = $user?.displayName?.split(' ')[0] ?? 'Anonymous';
				const newUser: TUser = {
					userNickname: firstName,
					userRole: 'member',
					userRating: 1000,
					userWins: 0,
					userGames: 0,
					userStreak: 0,
				};
				await setDoc(docRef, newUser);
			}
			dbUser = docStore<TUser>(firestore!, `users/${$user?.uid}`);
		} catch (error) {
			console.error('Error signing in with Google', error);
		}
	};
</script>

{#if auth}
	<header class="navbar" style="background-color: #1f2a39;">
		<div class="navbar-start prose">
			<h1>613 Stanford Dr</h1>
		</div>

		<div class="navbar-center space-x-2">
			<a class="btn" href="/">Home</a>
			<a class="btn" href="/blog" data-sveltekit-preload-data>Blog</a>
			<a class="btn" href="/pool" data-sveltekit-preload-data>Pool</a>
		</div>

		<div class="navbar-end space-x-3">
			{#if $user && $dbUser}
				<a class="btn-circle" href="/profile">
					<img
						src={$user?.photoURL || 'https://source.unsplash.com/random'}
						alt={$user?.displayName}
						class="h-12 w-12 rounded-full"
					/>
				</a>
				<h1>{$dbUser?.userNickname}</h1>
				<button on:click={() => auth.signOut()} class="btn">Log Out</button>
			{:else}
				<button on:click={signInWithGoogle} class="btn">
					<i class="fa-brands fa-google fa-xl" style="color: #eb4d27;" />
					Sign In with Google
				</button>
			{/if}
		</div>
	</header>
{/if}
