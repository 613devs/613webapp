import { firestore } from '$lib/firebase';
import { collection, getDocs, or, orderBy, query, where } from 'firebase/firestore';

export const getUserStats = async () => {
	const matchesRef = collection(firestore, 'matches');
	const userMatchesQuery = query(
		matchesRef,
		or(where('winnerUID', '==', $user!.uid), where('loserUID', '==', $user!.uid)),
		orderBy('match_dt', 'desc'),
	);
	const userMatchesSnapshot = await getDocs(userMatchesQuery);
	const userMatches: TMatch[] = userMatchesSnapshot.docs.map((doc) => doc.data() as TMatch);

	let totalWins = 0;
	let winPercentage = 0;
	const totalGames = userMatches.length;
	userMatches.forEach((match) => {
		if (match.winnerUID === $user!.uid) {
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
