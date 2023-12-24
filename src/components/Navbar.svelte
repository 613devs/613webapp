<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { Doc, getFirebaseContext, userStore } from 'sveltefire';
	import type { TProfile } from '../types';

	const { auth, firestore } = getFirebaseContext();
	const user = userStore(auth!);

	const login = async () => {
		const userResult = await signInWithPopup(auth!, new GoogleAuthProvider());

		const profileRef = doc(firestore!, 'profiles', userResult.user?.uid);
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
</script>

{#if auth}
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
				<Doc ref={`profiles/${$user.uid}`} let:data>
					<p class="prose">
						Welcome, <span class="italic font-bold">
							{data.username}
						</span>
					</p>
					<a class="btn-circle" href="/profile">
						<img
							src={$user?.photoURL || 'https://source.unsplash.com/random'}
							alt={$user?.displayName}
							class="h-12 w-12 rounded-full"
						/>
					</a>
					<button on:click={() => auth.signOut()} class="btn">Log Out</button>
				</Doc>
			{:else}
				<button on:click={() => login()} class="btn">
					<i class="fa-brands fa-google fa-xl" style="color: #eb4d27;" />
					Sign In with Google
				</button>
			{/if}
		</div>
	</header>
{/if}
