import { collectionStore } from 'sveltefire';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '$lib/firebase';

const matchesRef = collection(firestore, 'matches');
const matchesQuery = query(matchesRef, orderBy('match_dt', 'desc'));
export const matches = collectionStore(firestore, matchesQuery);
