import type { PageLoad } from './$types';
import { firestore } from '$lib/firebase';
import { query, collection, getDocs, orderBy, limit } from 'firebase/firestore';
import type { TProfile, TMatch } from '../../types';

const QUERY_LIMIT = 10;

export const load: PageLoad = async () => {
	const profileRef = collection(firestore, 'profiles');
	const profileQuery = query(profileRef, orderBy('rating', 'desc'));
	const querySnap = await getDocs(profileQuery);

	const matchesRef = collection(firestore, 'matches');
	const matchesQuery = query(matchesRef, orderBy('match_dt', 'desc'), limit(QUERY_LIMIT));
	const matchesSnap = await getDocs(matchesQuery);
	return {
		profiles: querySnap.docs.map((doc) => doc.data() as TProfile),
		matches: matchesSnap.docs.map((doc) => doc.data() as TMatch),
	};
};
