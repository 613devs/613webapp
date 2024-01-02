<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto max-w-screen-lg">
	<div class="mx-auto text-center prose my-3">
		<h3 class="text-4xl">Leaderboard</h3>
	</div>
	<table class="table">
		<tr class="prose">
			<th class="text-left">username</th>
			<th class="text-right">rating</th>
		</tr>
		{#each data.profiles as profile}
			<tr class="hover prose">
				<td class="text-left">{profile.username}</td>
				<td class="text-right">{profile.rating}</td>
			</tr>
		{/each}
	</table>
	import { Doc, SignedIn, SignedOut, getFirebaseContext, userStore } from 'sveltefire';
	import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);

	const logMatch = async () => {
		const matchesRef = collection(firestore, 'matches');

		let winnerUID = 'A';
		let loserUID = 'B';
		let winnerRating = 1000;
		let loserRating = 1000;

		const newMatch = {
			match_dt: new Date(),
			winnerUID,
			loserUID,
			winnerRating,
			loserRating,
		};

		await addDoc(matchesRef, newMatch);
	};
</script>

<div class="flex flex-col items-center py-5 px-10 gap-5 min-h-screen bg-base-200">
	<SignedIn let:user>
		<button class="btn btn-wide bg-accent-content" on:click={logMatch}>
			<i class="fa-solid fa-plus fa-lg" />
		</button>
	</SignedIn>
	<div class="w-full px-30 py-5 flex flex-col gap-10 min-h-screen">
		<div class="bg-accent-content h-80 rounded-badge flex flex-col items-center">
			<div class="text-center prose my-3">
				<h3 class="text-4xl">Leaderboard</h3>
			</div>
		</div>
		<div class="bg-accent-content h-20 rounded-badge flex flex-col items-center">
			<div class="text-center prose my-3">
				<h3 class="text-4xl">Games Played</h3>
			</div>
		</div>
	</div>
</div>
