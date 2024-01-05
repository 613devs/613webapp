import type { PageLoad } from './$types';
import { firestore } from '$lib/firebase';
import { query, collection, getDocs, orderBy } from 'firebase/firestore';
import type { TProfile } from '../../types';

export const load: PageLoad = async () => {
	const profileRef = collection(firestore, 'profiles');
	const profileQuery = query(profileRef, orderBy('rating', 'desc'));
	const querySnap = await getDocs(profileQuery);

	return {
		profiles: querySnap.docs.map((doc) => doc.data() as TProfile),
	};
};
