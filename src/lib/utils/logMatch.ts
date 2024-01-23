import { firestore } from '$lib/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { calculateRatingChange } from '$lib/utils/rating';
import type { TMatch } from '../../types';

const matchesRef = collection(firestore, 'matches');

export const logMatch = async (winnerUID: string, loserUID: string) => {
	const winnerRef = doc(firestore, 'profiles', winnerUID);
	const loserRef = doc(firestore, 'profiles', loserUID);
	const winnerSnap = await getDoc(winnerRef);
	const loserSnap = await getDoc(loserRef);

	if (winnerSnap.exists() && loserSnap.exists()) {
		const winnerData = winnerSnap.data();
		const loserData = loserSnap.data();

		const change = calculateRatingChange(winnerData.rating, loserData.rating);
		const winnerNewRating = winnerData.rating + change;
		const loserNewRating = loserData.rating - change;

		await updateDoc(winnerRef, { rating: winnerNewRating });
		await updateDoc(loserRef, { rating: loserNewRating });
		await addDoc(matchesRef, {
			match_dt: new Date(),
			winnerUID,
			loserUID,
			change,
			winnerUsername: winnerData.username,
			loserUsername: loserData.username,
		} as TMatch);
	} else {
		alert('Internal error. Please try again.');
	}
};

export const logDuoMatch = async (winnerUIDs: [string, string], loserUIDs: [string, string]) => {
	const winnerRefs = winnerUIDs.map((uid) => doc(firestore, 'profiles', uid));
	const loserRefs = loserUIDs.map((uid) => doc(firestore, 'profiles', uid));
	const winnerSnaps = await Promise.all(winnerRefs.map((ref) => getDoc(ref)));
	const loserSnaps = await Promise.all(loserRefs.map((ref) => getDoc(ref)));

	if (winnerSnaps.every((snap) => snap.exists()) && loserSnaps.every((snap) => snap.exists())) {
		const winnerDatas = winnerSnaps.map((snap) => snap.data());
		const loserDatas = loserSnaps.map((snap) => snap.data());
		const winnerRatings = winnerDatas.map((data) => data!.rating);
		const loserRatings = loserDatas.map((data) => data!.rating);

		const winnerAverage = winnerRatings.reduce((acc, cur) => acc + cur, 0) / 2;
		const loserAverage = loserRatings.reduce((acc, cur) => acc + cur, 0) / 2;

		const change = Math.round(calculateRatingChange(winnerAverage, loserAverage) / 2);
		const winnerNewRatings = winnerRatings.map((rating) => rating + change);
		const loserNewRatings = loserRatings.map((rating) => rating - change);

		await Promise.all(
			winnerRefs.map((ref, index) => updateDoc(ref, { rating: winnerNewRatings[index] })),
		);
		await Promise.all(
			loserRefs.map((ref, index) => updateDoc(ref, { rating: loserNewRatings[index] })),
		);
		await addDoc(matchesRef, {
			match_dt: new Date(),
			winnerUID: winnerUIDs[0],
			winner2UID: winnerUIDs[1],
			loserUID: loserUIDs[0],
			loser2UID: loserUIDs[1],
			change,
			winnerUsername: winnerDatas[0]!.username,
			winner2Username: winnerDatas[1]!.username,
			loserUsername: loserDatas[0]!.username,
			loser2Username: loserDatas[1]!.username,
		} as TMatch);
	} else {
		alert('Internal error. Please try again.');
	}
};
