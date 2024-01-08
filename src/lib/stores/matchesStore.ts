import { collectionStore } from 'sveltefire';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '$lib/firebase';

const QUERY_LIMIT = 10;

const matchesRef = collection(firestore, 'matches');
const matchesQuery = query(matchesRef, orderBy('match_dt', 'desc'), limit(QUERY_LIMIT));
export const matchesStore = collectionStore(firestore, matchesQuery);
