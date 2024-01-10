<script lang="ts">
	import { Doc, SignedIn, SignedOut } from 'sveltefire';
	import { logout } from '$lib/utils/auth';
	import { doc, updateDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';
	import type { PageData } from './$types';

	export let data: PageData;

	let isEditingUsername = false;
	let newUsername = '';

	const changeUsername = async () => {
		const profileRef = doc(firestore, `profiles/${data.uid}`);
		await updateDoc(profileRef, { username: newUsername });
		isEditingUsername = false;
		newUsername = '';
	};
</script>

<div class="flex flex-col items-center py-5 gap-5 min-h-screen bg-base-200">
	<SignedIn let:user>
		<div class="w-1/2 rounded-badge flex flex-col items-center py-5 bg-accent-content">
			<Doc ref={`profiles/${user.uid}`} let:data>
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
					<button on:click={() => (isEditingUsername = !isEditingUsername)}>
						<i class="fas fa-edit fa-lg" />
					</button>
				</div>
				<p>
					{data.role} since {data.created_dt.toDate().toLocaleDateString()}
				</p>
			</Doc>
		</div>
		<div class="w-1/2 rounded-badge flex flex-col items-center py-5 px-10 gap-2 bg-accent-content">
			<h3 class="text-3xl font-semibold">Pool Statistics</h3>
			<div class="w-full flex flex-row justify-between">
				<div class="flex flex-col w-1/4 items-center p-5 rounded-box bg-primary-content">
					<h1 class="text-6xl">{data.stats.userWinCount}</h1>
					<p>Games Won</p>
				</div>
				<div class="flex flex-col w-1/4 items-center p-5 rounded-box bg-primary-content">
					<h1 class="text-6xl">{data.stats.userMatchCount}</h1>
					<p>Games Played</p>
				</div>
				<div class="flex flex-col w-1/4 items-center p-5 rounded-box bg-primary-content">
					<h1 class="text-6xl">{data.stats.userWinPer}</h1>
					<p>Win %</p>
				</div>
			</div>
		</div>
		<div class="w-1/2 rounded-badge flex flex-col items-center py-5 bg-accent-content">
			<h3 class="text-3xl font-semibold">Rating History</h3>
			<p class="text-xl">graph</p>
		</div>
		<button on:click={logout} class="btn bg-accent-content">Log Out</button>
	</SignedIn>
	<SignedOut>
		<div class="text-center prose">
			<h3 class="text-2xl">Sign in to view your profile</h3>
		</div>
	</SignedOut>
</div>
