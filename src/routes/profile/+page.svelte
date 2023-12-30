<script lang="ts">
	import { Doc, SignedIn, SignedOut, getFirebaseContext, userStore } from 'sveltefire';
	import { logout } from '$lib/utils/auth';
	import { doc, updateDoc } from 'firebase/firestore';
	import { firestore } from '$lib/firebase';

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);

	let isEditingUsername = false;
	let username = '';

	const changeUsername = async () => {
		const profileRef = doc(firestore, 'profiles', $user!.uid);
		await updateDoc(profileRef, { username });
		isEditingUsername = false;
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
							bind:value={username}
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
		<div class="w-1/2 rounded-badge flex flex-col items-center py-5 bg-accent-content">
			<h3 class="text-3xl font-semibold">Pool Statistics</h3>
			<p class="text-xl">Games Played: 0</p>
			<p class="text-xl">Games Won: 0</p>
			<p class="text-xl">Win Percentage: --</p>
		</div>
		<div class="w-1/2 rounded-badge flex flex-col items-center py-5 bg-accent-content">
			<h3 class="text-3xl font-semibold">Rating History</h3>
			<p class="text-xl">graph</p>
		</div>
		<div class="w-1/2 rounded-badge flex flex-col items-center py-5 px-10 gap-2 bg-accent-content">
			<h3 class="text-3xl font-semibold">Recent games</h3>
			<div class="w-full flex flex-row justify-between px-10 py-3 rounded-box bg-primary-content">
				<div class="w-1/3 flex items-center justify-center rounded-badge bg-green-300">
					<p class="text-black font-semibold">Player A (1000)</p>
				</div>
				<div class="p-2 rounded-box text-center bg-secondary-content">
					<p>1 - 0</p>
				</div>
				<div class="w-1/3 flex items-center justify-center rounded-badge bg-red-400">
					<p class="text-black font-semibold">Player B (1000)</p>
				</div>
			</div>
		</div>
		<button on:click={logout} class="btn bg-accent-content">Log Out</button>
	</SignedIn>
	<SignedOut>
		<div class="text-center prose">
			<h3 class="text-2xl">Sign in to view your profile</h3>
		</div>
	</SignedOut>
</div>
