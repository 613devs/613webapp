<script lang="ts">
	import { mockState, mockUser } from '../vitest-setup';

	let user = mockUser;
</script>

{#if mockState.isUserSignedIn}
	<slot {user} />
{/if}
