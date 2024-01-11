import { collectionStore } from 'sveltefire';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '$lib/firebase';

const profilesRef = collection(firestore, 'profiles');
const profileQuery = query(profilesRef, orderBy('rating', 'desc'));

export const profiles = collectionStore(firestore, profileQuery);
