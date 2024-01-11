import { auth, firestore } from '$lib/firebase';
import { collection, getDocs, or, orderBy, query, where } from 'firebase/firestore';
import type { TMatch } from '../../types';

export const getUserStats = async () => {
	const matchesRef = collection(firestore, 'matches');
	const userMatchesQuery = query(
		matchesRef,
		or(
			where('winnerUID', '==', auth.currentUser!.uid),
			where('loserUID', '==', auth.currentUser!.uid),
		),
		orderBy('match_dt', 'desc'),
	);
	const userMatchesSnapshot = await getDocs(userMatchesQuery);
	const userMatches: TMatch[] = userMatchesSnapshot.docs.map((doc) => doc.data() as TMatch);

	let totalWins = 0;
	let winPercentage = 0;
	const totalGames = userMatches.length;
	userMatches.forEach((match) => {
		if (match.winnerUID === auth.currentUser!.uid) {
			totalWins++;
		}
	});
	if (totalGames > 0) {
		winPercentage = (totalWins / totalGames) * 100;
	}
	return {
		totalWins,
		totalGames,
		winPercentage,
	};
};
