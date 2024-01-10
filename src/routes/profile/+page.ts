import type { PageLoad } from './$types';
import type { TMatch } from '../../types';
import { matchesStore } from '$lib/stores/matchesStore';
import { auth } from '$lib/firebase';

export const load: PageLoad = async () => {
	let unsubscribe: void | (() => void);
	let userWinCount = 0;
	let userLossCount = 0;
	let userWinPer = 0;
	const matchData: TMatch[] = [];
	if (auth.currentUser) {
		unsubscribe = matchesStore.subscribe((matches) => {
			matches.forEach((match) => {
				if (match.winnerUID === auth.currentUser!.uid) {
					userWinCount++;
					matchData.push(match as TMatch);
				} else if (match.loserUID === auth.currentUser!.uid) {
					userLossCount++;
					matchData.push(match as TMatch);
				}
			});
		});
	}
	if (userWinCount + userLossCount !== 0) {
		userWinPer = Math.round((userWinCount / (userWinCount + userLossCount)) * 100);
	}
	return {
		stats: {
			userWinCount,
			userMatchCount: userWinCount + userLossCount,
			userWinPer,
		},
		matches: matchData,
		uid: auth.currentUser?.uid,
		async cleanup() {
			if (unsubscribe) {
				unsubscribe();
			}
		},
	};
};
