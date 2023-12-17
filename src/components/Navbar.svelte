<script lang="ts">
	import type { User } from 'firebase/auth';
	import { authStore, authHandlers } from '../store/store';
	import type { TUser } from '../types';

	let googleUser: User | null;
	let dbUser: TUser | null;
	authStore.subscribe(async (value) => {
		googleUser = value.googleUser;
		dbUser = value.dbUser
	});
</script>

<header class="bg-secondary p-4 flex justify-between items-center text-white">
	<!-- o -->
	<h1 class=" font-bold text-sm md:text-2xl tracking-widest">La Casa de Carne | 613 Stanford Dr</h1>
	<!-- links -->
	<div class="flex items-center space-x-10 font-semibold">
		<a href="/home">Home</a>
		<a href="/blog" data-sveltekit-preload-data>Blog</a>
		<a href="/pool" data-sveltekit-preload-data>Pool</a>
	</div>

	<!-- User/Logout -->

	{#if googleUser}
		<div class="items-center space-x-2 hidden xl:inline-flex">
			<div class="flex flex-col">
				<p>
					Welcome, <span class="text-blue-500 italic font-bold">
						{dbUser?.userNickname}
					</span>
				</p>
			</div>
			<a href="/profile">
				<img
					src={googleUser?.photoURL}
					alt={googleUser?.displayName}
					class="h-12 w-12 rounded-full"
				/>
			</a>
			<button on:click={authHandlers.logout} class="bg-white p-2 rounded-full text-black"
				>Log Out</button
			>
		</div>
	{/if}
</header>