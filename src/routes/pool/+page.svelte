<script lang="ts">
	import { profiles } from '$lib/stores/profilesStore';
	import { matches } from '$lib/stores/matchesStore';
	import LogMatchButton from '$lib/components/LogMatchButton.svelte';
</script>

<div class="flex flex-col w-full gap-5">
	<LogMatchButton />
	<div class="text-center font-bold text-xl text-white">
		<h1>{$matches.length} Logged Matches</h1>
	</div>
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
						<h1 class="font-semibold">{match.winnerUsername}</h1>
						{#if match.winner2Username}
							<h1 class="font-semibold">& {match.winner2Username}</h1>
						{/if}
					</div>
					<div class="flex flex-row items-center gap-2">
						<i class="fas fa-poop" />
						<h1 class="font-semibold">{match.loserUsername}</h1>
						{#if match.loser2Username}
							<h1 class="font-semibold">& {match.loser2Username ?? ''}</h1>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
