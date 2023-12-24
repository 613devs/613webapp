<script lang="ts">
	import { getFirebaseContext, userStore, Doc } from 'sveltefire';

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);
</script>

<main>
	<Doc ref={`users/${$user?.uid}`} let:data>
		{#if $user}
			<div class="flex flex-col items-center">
				<h1 class="text-4xl">{$user?.displayName}</h1>
				<p>{data?.userRating}</p>
				<p>{data?.userWins}</p>
				<p>{data?.userGames}</p>
				<p>{data?.userStreak}</p>
			</div>
		{:else}
			<h1>Not logged in</h1>
		{/if}
	</Doc>
</main>
