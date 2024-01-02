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
	import Modal from '../../lib/components/Modal.svelte';

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);

	let showModal = false;
	let winnerUsers: HTMLDetailsElement;
	let loserUsers: HTMLDetailsElement;
	let winnerName = 'Select a winner';
	let loserName = 'Select a loser';

	let winnerUID: string;
	let loserUID: string;

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

		// reset values
	};
</script>

<div class="flex flex-col items-center py-5 px-10 gap-5 min-h-screen bg-base-200">
	<SignedIn let:user>
		<button class="btn btn-wide bg-accent-content" on:click={() => (showModal = true)}>
			<i class="fa-solid fa-plus fa-lg" />
		</button>
		<Modal bind:showModal>
			<div slot="header">
				<h3 class="text-2xl">Match Results</h3>
			</div>
			<div class="flex flex-col">
				<div>
					<i class="fas fa-crown" />
					<details class="dropdown" bind:this={winnerUsers}>
						<summary class="m-1 btn bg-green-300 text-black">{winnerName}</summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							<li>
								<a
									on:click={() => {
										winnerName = 'Item 1';
										winnerUsers.removeAttribute('open');
									}}>Item 1</a
								>
							</li>
							<li>
								<a
									on:click={() => {
										winnerName = 'Item 2';
										winnerUsers.removeAttribute('open');
									}}>Item 2</a
								>
							</li>
						</ul>
					</details>
				</div>
				<div>
					<i class="fas fa-poop" />
					<details class="dropdown" bind:this={loserUsers}>
						<summary class="m-1 btn bg-red-400 text-black">{loserName}</summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							<li>
								<a
									on:click={() => {
										loserName = 'Item 1';
										loserUsers.removeAttribute('open');
									}}>Item 1</a
								>
							</li>
							<li>
								<a
									on:click={() => {
										loserName = 'Item 2';
										loserUsers.removeAttribute('open');
									}}>Item 2</a
								>
							</li>
						</ul>
					</details>
				</div>
				<button on:click={logMatch} class="btn bg-accent-content self-center">Submit</button>
			</div>
		</Modal>
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
