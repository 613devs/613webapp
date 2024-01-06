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
	let winnerUsername = 'Select a winner';
	let loserUsername = 'Select a loser';
	let winnerUID = '';
	let loserUID = '';

	const logMatch = async () => {
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
				winnerUsername,
				loserUsername,
			};
			await addDoc(matchesRef, newMatch);
		} else {
			alert('Internal error. Please try again.');
		}

		hideModal = true;
		winnerUsername = 'Select a winner';
		loserUsername = 'Select a loser';
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
						<summary class="m-1 btn">{winnerUsername}</summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each data.profiles as profile}
								<li>
									<button
										on:click={() => {
											winnerUsername = profile.username;
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
						<summary class="m-1 btn">{loserUsername}</summary>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each data.profiles as profile}
								<li>
									<button
										on:click={() => {
											loserUsername = profile.username;
											loserUID = profile.uid;
											loserOptions.removeAttribute('open');
										}}>{profile.username}</button
									>
								</li>
							{/each}
						</ul>
					</details>
				</div>
				<button
					on:click={logMatch}
					disabled={winnerUID === loserUID || winnerUID === '' || loserUID === ''}
					class="btn bg-accent-content self-center">Submit</button
				>
			</div>
		</Modal>
	</SignedIn>
	<div class="w-full px-30 py-5 flex flex-col gap-10 min-h-screen">
		<div class="bg-accent-content p-5 rounded-badge flex flex-col gap-3 items-center">
			<div class="text-center prose my-3">
				<h3 class="text-4xl">Leaderboard</h3>
			</div>
			{#each data.profiles as profile, index}
				<div
					class="w-full flex flex-row rounded-box items-center justify-between py-3 px-10 bg-primary-content"
				>
					<div class="flex flex-row gap-5 items-center">
						<h1 class="text-3xl text-white font-semibold">{index + 1}</h1>
						<h1 class="text-xl">{profile.username}</h1>
					</div>
					<h1 class="text-xl">{profile.rating}</h1>
				</div>
			{/each}
		</div>
		<div class="bg-accent-content p-5 rounded-badge flex flex-col gap-3 items-center">
			<div class="text-center prose my-3">
				<h3 class="text-4xl">Recent Matches</h3>
			</div>
			{#each data.matches as match}
				<div
					class="w-full flex flex-row rounded-box items-center justify-between py-3 px-10 bg-primary-content"
				>
					<div class="p-3 rounded-box bg-green-400">
						<h1 class="text-xl text-black font-semibold">{match.winnerUsername}</h1>
					</div>
					<h1 class="text-xl">beat</h1>
					<div class="p-3 rounded-box bg-red-400">
						<h1 class="text-xl text-black font-semibold">{match.loserUsername}</h1>
					</div>
					<h1>on</h1>
					<h1>{match.match_dt.toDate().toLocaleDateString()}</h1>
				</div>
			{/each}
		</div>
	</div>
</div>
