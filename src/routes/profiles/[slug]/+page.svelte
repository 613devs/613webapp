<script lang="ts">
	import { Doc, SignedIn, SignedOut, getFirebaseContext, userStore } from 'sveltefire';
	import { logout } from '$lib/utils/auth';
	import { doc, updateDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';
	import { getUserStats } from '$lib/utils/userStats';
	import type { PageData } from '../$types';

	export let data: PageData;

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);

	let isEditingUsername = false;
	let newUsername = '';

	const changeUsername = async () => {
		const profileRef = doc(firestore, `profiles/${$user!.uid}`);
		await updateDoc(profileRef, { username: newUsername });
		isEditingUsername = false;
		newUsername = '';
	};
</script>

<div class="flex flex-col items-center w-full gap-5">
	<SignedIn let:user>
		{#await getUserStats(data.uid) then { totalWins, totalGames, winPercentage }}
			<Doc ref={`profiles/${data.uid}`} let:data>
				<div class="w-full rounded-badge flex flex-col items-center p-5 bg-accent-content">
					<div class="flex gap-3">
						{#if isEditingUsername}
							<input
								class="input input-bordered bg-accent-content w-full max-w-xs"
								type="text"
								placeholder="Enter new username"
								maxlength="20"
								bind:value={newUsername}
								on:keydown={(event) => event.key === 'Enter' && changeUsername()}
							/>
						{:else}
							<h3 class="text-3xl font-semibold">{data.username}</h3>
						{/if}
						{#if user.uid === data.uid}
							<button on:click={() => (isEditingUsername = !isEditingUsername)}>
								<i class="fas fa-edit fa-lg" />
							</button>
						{/if}
					</div>
					<p>
						{data.role} since {data.created_dt.toDate().toLocaleDateString()}
					</p>
				</div>
				<div class="w-full rounded-badge flex flex-col items-center p-5 gap-2 bg-accent-content">
					<h3 class="text-3xl font-semibold">Pool Statistics</h3>
					<div class="flex w-full flex-row justify-between items-center gap-2">
						<div
							class="flex flex-col w-1/4 md:w-1/6 h-full items-center p-2 rounded-box text-center bg-primary-content"
						>
							<h1 class="text-3xl">{totalWins}</h1>
							<p class="text-xs">Won</p>
						</div>
						<div
							class="flex flex-col w-1/4 md:w-1/6 h-full items-center p-2 rounded-box text-center bg-primary-content"
						>
							<h1 class="text-3xl">{totalGames}</h1>
							<p class="text-xs">Played</p>
						</div>
						<div
							class="flex flex-col w-1/4 md:w-1/6 h-full items-center p-2 rounded-box text-center bg-primary-content"
						>
							<h1 class="text-3xl">{winPercentage}</h1>
							<p class="text-xs">Win %</p>
						</div>
						<div
							class="flex flex-col w-1/4 md:w-1/6 h-full items-center p-2 rounded-box text-center bg-primary-content"
						>
							<h1 class="text-3xl">{data.rating}</h1>
							<p class="text-xs">Rating</p>
						</div>
					</div>
				</div>
				<div class="w-full rounded-badge flex flex-col items-center p-5 bg-accent-content">
					<h3 class="text-3xl font-semibold">Rating History</h3>
					<p class="text-xl">graph</p>
				</div>
				<button on:click={logout} class="btn bg-accent-content">Log Out</button>
			</Doc>
		{/await}
	</SignedIn>
	<SignedOut>
		<div class="text-center prose">
			<h3 class="text-2xl">Sign in to view your profile</h3>
		</div>
	</SignedOut>
</div>
