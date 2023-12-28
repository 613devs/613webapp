<script>
	import { mockState } from '../vitest-setup';
</script>

{#if !mockState.isUserSignedIn}
	<slot />
{/if}
