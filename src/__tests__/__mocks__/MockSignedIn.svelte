<script lang="ts">
	import { mockState, mockUser } from '../vitest-setup';

	let user = mockUser;
	// append to data with other mocks
</script>

{#if mockState.isUserSignedIn}
	<slot {user} />
{/if}
