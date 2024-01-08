import { firestore } from '$lib/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { calculateRatings } from './rating';

export const logMatch = async (
	winnerUID: string,
	loserUID: string,
	winnerUsername: string,
	loserUsername: string,
) => {
	const winnerRef = doc(firestore, 'profiles', winnerUID);
	const winnerSnap = await getDoc(winnerRef);
	const loserRef = doc(firestore, 'profiles', loserUID);
	const loserSnap = await getDoc(loserRef);

	if (winnerSnap.exists() && loserSnap.exists()) {
		const { winnerNewRating, loserNewRating } = calculateRatings(
			winnerSnap.data().rating,
			loserSnap.data().rating,
		);
		await updateDoc(winnerRef, { rating: winnerNewRating });
		await updateDoc(loserRef, { rating: loserNewRating });
		const matchesRef = collection(firestore, 'matches');
		const newMatch = {
			match_dt: new Date(),
			winnerUID,
			loserUID,
			winnerRating: winnerNewRating,
			loserRating: loserNewRating,
			winnerUsername,
			loserUsername,
		};
		await addDoc(matchesRef, newMatch);
	} else {
		alert('Internal error. Please try again.');
	}
};
