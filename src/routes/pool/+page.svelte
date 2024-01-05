<script lang="ts">
	import { SignedIn } from 'sveltefire';
	import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';
	import Modal from '../../lib/components/Modal.svelte';
	import type { PageData } from './$types';
	import { calculateRatings } from '$lib/utils/rating';

	export let data: PageData;

	// logging a match
	let showModal = false;
	let hideModal = false;
	let winnerOptions: HTMLDetailsElement;
	let loserOptions: HTMLDetailsElement;
	let winnerName = 'Select a winner';
	let loserName = 'Select a loser';
	let winnerUID = '';
	let loserUID = '';

	const logMatch = async () => {
		if (winnerUID !== loserUID && winnerUID !== '' && loserUID !== '') {
			const winnerRef = doc(firestore, 'profiles', winnerUID);
			const winnerSnap = await getDoc(winnerRef);
			const loserRef = doc(firestore, 'profiles', loserUID);
			const loserSnap = await getDoc(loserRef);

			if (winnerSnap.exists() && loserSnap.exists()) {
				const { winnerNewRating, loserNewRating } = calculateRatings(
					winnerSnap.data().rating,
					loserSnap.data().rating,
				);
				await updateDoc(winnerRef, { rating: winnerNewRating });
				await updateDoc(loserRef, { rating: loserNewRating });
				const matchesRef = collection(firestore, 'matches');
				const newMatch = {
					match_dt: new Date(),
					winnerUID,
					loserUID,
					winnerRating: winnerNewRating,
					loserRating: loserNewRating,
				};
				await addDoc(matchesRef, newMatch);
			} else {
				alert('Internal error. Please try again.');
			}
		} else {
			alert('Please select a winner and a loser.');
		}

		hideModal = true;
		winnerName = 'Select a winner';
		loserName = 'Select a loser';
		winnerUID = '';
		loserUID = '';
	};
</script>

<div class="flex flex-col items-center py-5 px-10 gap-5 min-h-screen bg-base-200">
	<SignedIn>
		<button
			class="btn btn-wide bg-accent-content"
			on:click={() => {
				showModal = true;
				hideModal = false;
			}}
		>
			<i class="fa-solid fa-plus fa-lg" />
		</button>
		<Modal bind:showModal bind:hideModal>
			<div slot="header">
				<h3 class="text-2xl">Match Results</h3>
			</div>
			<div class="flex flex-col pt-3 gap-3">
				<div>
					<i class="fas fa-crown" />
					<details class="dropdown" bind:this={winnerOptions}>
						<summary class="m-1 btn">{winnerName}</summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each data.profiles as profile}
								<li>
									<button
										on:click={() => {
											winnerName = profile.username;
											winnerUID = profile.uid;
											winnerOptions.removeAttribute('open');
										}}>{profile.username}</button
									>
								</li>
							{/each}
						</ul>
					</details>
				</div>
				<div>
					<i class="fas fa-poop" />
					<details class="dropdown" bind:this={loserOptions}>
						<summary class="m-1 btn">{loserName}</summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each data.profiles as profile}
								<li>
									<button
										on:click={() => {
											loserName = profile.username;
											loserUID = profile.uid;
											loserOptions.removeAttribute('open');
										}}>{profile.username}</button
									>
								</li>
							{/each}
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
		</div>
		<div class="bg-accent-content h-20 rounded-badge flex flex-col items-center">
			<div class="text-center prose my-3">
				<h3 class="text-4xl">Games Played</h3>
			</div>
		</div>
	</div>
</div>
