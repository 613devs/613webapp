<script lang="ts">
	import { SignedIn } from 'sveltefire';
	import { profiles } from '$lib/stores/profilesStore';
	import { logDuoMatch, logMatch } from '$lib/utils/logMatch';
	import type { DocumentData } from 'firebase/firestore';

	let availableProfiles: DocumentData[] = [];

	profiles.subscribe((profiles) => {
		availableProfiles = profiles.map((profile) => profile);
	});

	let showModal: boolean;
	let hideModal: boolean;

	let winnerUsername = 'Select a winner';
	let loserUsername = 'Select a loser';
	let winnerUID = '';
	let loserUID = '';

	let winner2Username = 'Partner?';
	let loser2Username = 'Partner?';
	let winner2UID = '';
	let loser2UID = '';

	let isSubmitting = false;

	let dialog: HTMLDialogElement;
	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && hideModal) dialog.close();

	const handleSubmit = async () => {
		isSubmitting = true;
		try {
			if (winner2UID === '' && loser2UID === '') await logMatch(winnerUID, loserUID);
			else await logDuoMatch([winnerUID, winner2UID], [loserUID, loser2UID]);
		} catch (error) {
			console.log(error);
		} finally {
			isSubmitting = false;
			hideModal = true;
			winnerUsername = 'Select a winner';
			loserUsername = 'Select a loser';
			winnerUID = '';
			loserUID = '';
			winner2Username = 'Partner?';
			loser2Username = 'Partner?';
			winner2UID = '';
			loser2UID = '';
		}
	};

	let winnerOptions: HTMLDetailsElement;
	let loserOptions: HTMLDetailsElement;
	let winner2Options: HTMLDetailsElement;
	let loser2Options: HTMLDetailsElement;
</script>

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

	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<dialog
		bind:this={dialog}
		on:close={() => {
			showModal = false;
			winnerUsername = 'Select a winner';
			loserUsername = 'Select a loser';
			winnerUID = '';
			loserUID = '';
			winner2Username = 'Partner?';
			loser2Username = 'Partner?';
			winner2UID = '';
			loser2UID = '';
			availableProfiles = $profiles.map((profile) => profile);
		}}
		on:click|self={() => dialog.close()}
		class="lg:w-1/3 md:w-1/2 w-3/4 rounded-badge glass p-6 bg-primary-content backdrop:bg-black backdrop:bg-opacity-60"
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click|stopPropagation>
			<div class=" flex justify-between items-center">
				<h3 class="text-2xl">Match Results</h3>
				<button on:click={() => dialog.close()}>
					<i class="fa-solid fa-xmark fa-lg" />
				</button>
			</div>
			<div class="flex flex-col pt-3 gap-3">
				<div>
					<i class="fas fa-crown" />
					<details class="dropdown" bind:this={winnerOptions}>
						<summary
							class="m-1 btn"
							on:click={() => {
								loserOptions.removeAttribute('open');
								winner2Options.removeAttribute('open');
								loser2Options.removeAttribute('open');
							}}>{winnerUsername}</summary
						>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each availableProfiles as profile}
								<li>
									<button
										on:click={() => {
											winnerUsername = profile.username;
											winnerUID = profile.uid;
											winnerOptions.removeAttribute('open');
											availableProfiles = availableProfiles.filter(
												(profile) => profile.uid !== winnerUID,
											);
										}}>{profile.username}</button
									>
								</li>
							{/each}
						</ul>
					</details>
					/
					<details class="dropdown" bind:this={winner2Options}>
						<summary
							class="m-1 btn"
							on:click={() => {
								winnerOptions.removeAttribute('open');
								loserOptions.removeAttribute('open');
								loser2Options.removeAttribute('open');
							}}>{winner2Username}</summary
						>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each availableProfiles as profile}
								<li>
									<button
										on:click={() => {
											winner2Username = profile.username;
											winner2UID = profile.uid;
											winner2Options.removeAttribute('open');
											availableProfiles = availableProfiles.filter(
												(profile) => profile.uid !== winner2UID,
											);
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
						<summary
							class="m-1 btn"
							on:click={() => {
								winnerOptions.removeAttribute('open');
								winner2Options.removeAttribute('open');
								loser2Options.removeAttribute('open');
							}}>{loserUsername}</summary
						>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each availableProfiles as profile}
								<li>
									<button
										on:click={() => {
											loserUsername = profile.username;
											loserUID = profile.uid;
											loserOptions.removeAttribute('open');
											availableProfiles = availableProfiles.filter(
												(profile) => profile.uid !== loserUID,
											);
										}}>{profile.username}</button
									>
								</li>
							{/each}
						</ul>
					</details>
					/
					<details class="dropdown" bind:this={loser2Options}>
						<summary
							class="m-1 btn"
							on:click={() => {
								winnerOptions.removeAttribute('open');
								loserOptions.removeAttribute('open');
								winner2Options.removeAttribute('open');
							}}>{loser2Username}</summary
						>
						<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
							{#each availableProfiles as profile}
								<li>
									<button
										on:click={() => {
											loser2Username = profile.username;
											loser2UID = profile.uid;
											loser2Options.removeAttribute('open');
											availableProfiles = availableProfiles.filter(
												(profile) => profile.uid !== loser2UID,
											);
										}}>{profile.username}</button
									>
								</li>
							{/each}
						</ul>
					</details>
				</div>
				<button
					on:click={handleSubmit}
					disabled={winnerUID === '' ||
						loserUID === '' ||
						isSubmitting ||
						(winner2UID === '' && loser2UID !== '') ||
						(winner2UID !== '' && loser2UID === '')}
					class="btn bg-accent-content self-center">Submit</button
				>
			</div>
		</div>
	</dialog>
</SignedIn>

<style>
	dialog[open] {
		animation: zoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
