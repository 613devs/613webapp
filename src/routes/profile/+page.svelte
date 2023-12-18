<script lang="ts">
	import type { User } from 'firebase/auth';
	import { authStore } from '../../store/store';
	import type { TUser } from '../../types';

	let googleUser: User | null;
	let dbUser: TUser | null;
	authStore.subscribe(async (value) => {
		googleUser = value.googleUser;
		dbUser = value.dbUser;
	});
</script>

<main class="">
	<div class="relative mt-[150px] p-2 lg:ml-[133px] flex flex-col">
		<!-- Main Tagline -->
		<div class="text-center">
			<h1 class="text-[32px] font-bold text-white lg:w-[710px]">Profile</h1>
		</div>
		<!-- User Information -->
		{#if googleUser && dbUser}
			<div class="flex flex-col items-center gap-10">
				<div class="flex flex-row items-center gap-10">
					<img
						src={googleUser?.photoURL}
						alt={googleUser?.displayName}
						class="h-12 w-12 rounded-full"
					/>
					<h1 class="capitalize text-2xl font-bold tracking-widest">{googleUser?.displayName}</h1>
				</div>
				<div class="flex flex-col items-center gap-10">
					<p class="text-xl font-bold">Nickname: {dbUser?.userNickname}</p>
					<p class="text-xl font-bold">Email: {googleUser?.email}</p>
					<p class="text-xl font-bold">Pool ELO: {dbUser?.userRating}</p>
				</div>
			</div>
		{/if}
	</div>
</main>
