import { firestore } from '$lib/firebase';
import { collection, getDocs, or, orderBy, query, where } from 'firebase/firestore';
import type { TMatch } from '../../types';

export const getUserStats = async (uid: string) => {
	const matchesRef = collection(firestore, 'matches');
	const userMatchesQuery = query(
		matchesRef,
		or(
			where('winnerUID', '==', uid),
			where('loserUID', '==', uid),
			where('winner2UID', '==', uid),
			where('loser2UID', '==', uid),
		),
		orderBy('match_dt', 'desc'),
	);
	const userMatchesSnapshot = await getDocs(userMatchesQuery);
	const userMatches: TMatch[] = userMatchesSnapshot.docs.map((doc) => doc.data() as TMatch);

	let totalWins = 0;
	let winPercentage = 0;
	const totalGames = userMatches.length;
	userMatches.forEach((match) => {
		if (match.winnerUID === uid || match.winner2UID === uid) {
			totalWins++;
		}
	});
	if (totalGames > 0) {
		winPercentage = parseFloat(((totalWins / totalGames) * 100).toFixed(2));
	}
	return {
		totalWins,
		totalGames,
		winPercentage,
	};
};
