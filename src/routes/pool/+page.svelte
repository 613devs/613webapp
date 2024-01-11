<script lang="ts">
	import { SignedIn } from 'sveltefire';
	import Modal from '../../lib/components/Modal.svelte';
	import { profiles } from '$lib/stores/profilesStore';
	import { matches } from '$lib/stores/matchesStore';
	import { logMatch } from '$lib/utils/logMatch';

	let showModal = false;
	let hideModal = false;
	let winnerOptions: HTMLDetailsElement;
	let loserOptions: HTMLDetailsElement;
	let winnerUsername = 'Select a winner';
	let loserUsername = 'Select a loser';
	let winnerUID = '';
	let loserUID = '';

	const handleSubmit = async () => {
		await logMatch(winnerUID, loserUID, winnerUsername, loserUsername);
		hideModal = true;
		winnerUsername = 'Select a winner';
		loserUsername = 'Select a loser';
		winnerUID = '';
		loserUID = '';
	};
</script>

<div class="flex flex-col w-full gap-5">
	<SignedIn>
		<button
			class="btn btn-wide self-center bg-accent-content"
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
							{#each $profiles as profile}
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
							{#each $profiles as profile}
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
					on:click={handleSubmit}
					disabled={winnerUID === loserUID || winnerUID === '' || loserUID === ''}
					class="btn bg-accent-content self-center">Submit</button
				>
			</div>
		</Modal>
	</SignedIn>
	<div class="flex flex-col gap-10">
		<div class="bg-accent-content p-5 rounded-badge flex flex-col gap-3 items-center">
			<div class="text-center prose">
				<h3 class="text-4xl">Leaderboard</h3>
			</div>
			{#each $profiles as profile, index}
				<a
					class="w-full flex flex-row rounded-box items-center justify-between py-3 px-10 bg-primary-content"
					href="/profiles/{profile.uid}"
				>
					<div class="flex flex-row gap-5 items-center">
						<h1 class="text-3xl text-white font-semibold">{index + 1}</h1>
						<h1 class="text-xl">{profile.username}</h1>
					</div>
					<h1 class="text-xl">{profile.rating}</h1>
				</a>
			{/each}
		</div>
		<div class="bg-accent-content p-5 rounded-badge flex flex-col gap-3 items-center">
			<div class="text-center prose">
				<h3 class="text-4xl">Recent Matches</h3>
			</div>
			{#each $matches as match}
				<div
					class="w-full flex flex-row rounded-box items-center justify-between p-5 bg-primary-content gap-2"
				>
					<h1 class="text-white">{match.match_dt.toDate().toLocaleDateString()}</h1>
					<div class="flex flex-row items-center gap-2">
						<i class="fas fa-crown" />
						<h1 class="text-xl font-semibold">{match.winnerUsername}</h1>
					</div>
					<div class="flex flex-row items-center gap-2">
						<i class="fas fa-poop" />
						<h1 class="text-xl font-semibold">{match.loserUsername}</h1>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
