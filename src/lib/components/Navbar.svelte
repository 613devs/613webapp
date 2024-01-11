<script lang="ts">
	import { Doc, SignedIn, SignedOut } from 'sveltefire';
	import { login, logout } from '$lib/utils/auth';
</script>

<header class="navbar">
	<div class="navbar-start flex gap-2">
		<div class="prose">
			<h1>613</h1>
		</div>
		<div class="prose hidden md:block">
			<h1>Stanford Dr</h1>
		</div>
	</div>

	<div class="navbar-center space-x-2">
		<a class="btn" href="/">Home</a>
		<a class="btn" href="/pool" data-sveltekit-preload-data>Pool</a>
	</div>

	<div class="navbar-end space-x-1">
		<SignedIn let:user>
			<Doc ref={`profiles/${user.uid}`} let:data>
				<p class="prose hidden md:block">
					Welcome, <span class="italic font-bold">
						{data.username}
					</span>
				</p>
				<a class="btn-circle" href="/profiles/{user?.uid}">
					<img src={user?.photoURL} alt={user?.displayName} class="h-12 w-12 rounded-full" />
				</a>
				<button on:click={logout} class="btn hidden md:block">Log Out</button>
			</Doc>
		</SignedIn>
		<SignedOut>
			<button on:click={login} class="btn">
				<i class="fa-brands fa-google fa-xl" style="color: #eb4d27;" />
				Sign In with Google
			</button>
		</SignedOut>
	</div>
</header>
