import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp({
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);
if (
	import.meta.env.MODE !== 'test' &&
	typeof location !== 'undefined' &&
	location.hostname === 'localhost'
) {
	connectFirestoreEmulator(firestore, 'localhost', 8080);
	connectAuthEmulator(auth, 'http://localhost:9099');
}
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
