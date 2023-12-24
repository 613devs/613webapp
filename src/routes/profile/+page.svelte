<script lang="ts">
	import { Doc, getFirebaseContext, userStore } from 'sveltefire';

	const { auth } = getFirebaseContext();
	const user = userStore(auth!);
</script>

<Doc ref={`profiles/${$user?.uid}`} let:data>
	<div class="flex justify-center align-middle min-h-screen bg-base-200">
		<div class="text-center prose my-5">
			<h3 class="text-7xl">{data.username}</h3>
			<p>
				{data.role} since {data.created_dt.toDate().toLocaleDateString()}
			</p>
		</div>
	</div>
</Doc>
