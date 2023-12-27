<script lang="ts">
	import { Doc, getFirebaseContext, userStore } from 'sveltefire';

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);
</script>


<main>
    <div class="container mx-auto px-30 py-5 flex flex-col gap-10 min-h-screen">
        <div class="bg-accent-content h-80 rounded-badge flex flex-col items-center">
            <div class="text-center prose my-3">
                <h3 class="text-4xl">Leaderboard</h3>
            </div>
        </div>
        <div class="bg-accent-content h-20 rounded-badge flex flex-col items-center">
            <div class="text-center prose my-3">
                <h3 class="text-4xl">Games Played</h3>
            </div>
        </div>
    </div>
</main>
