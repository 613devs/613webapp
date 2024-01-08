// import type { PageLoad } from './$types';
// import type { TMatch } from '../../types';
// import { matchesStore } from '$lib/stores/matchesStore';
// import { getFirebaseContext, userStore } from 'sveltefire';
// import { onDestroy } from 'svelte';

// export const load: PageLoad = async () => {
// 	const { auth } = getFirebaseContext();
// 	const user = userStore(auth!);
// 	const userMatches = [];
// 	const unsubscribe = matchesStore.subscribe((matches) => {
// 		matches.forEach((match) => {
// 			if (match.winnerUID === user.uid || match.loserUID === user.uid) {
// 				userMatches.push(match);
// 			}
// 		});
// 	});
// 	onDestroy(unsubscribe);
// 	return {
// 		matches: userMatches,
// 	};
// };
