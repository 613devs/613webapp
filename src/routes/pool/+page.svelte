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
</div>
