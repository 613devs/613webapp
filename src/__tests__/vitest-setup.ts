import type { User } from 'firebase/auth';
import { vi } from 'vitest';
import type { Auth } from 'firebase/auth';
import type { TProfile } from '../types';
import MockDoc from './__mocks__/MockDoc.svelte';

vi.mock('sveltefire', async (importOriginal) => {
	const mod = await importOriginal<typeof import('sveltefire')>();
	return {
		...mod,
		getFirebaseContext: () => ({ auth: {} as Auth }),
		Doc: MockDoc,
		userStore: vi.fn(),
	};
});

export const mockProfile: TProfile = {
	username: 'test user',
	role: 'member',
	created_dt: new Date('2022-01-01T00:00:00Z'),
};

export const mockUser: User = {
	uid: 'test-user-uid',
	email: 'testemail@test.com',
	displayName: 'test user',
	photoURL: 'https://example.com/mock-user-photo.jpg',
	emailVerified: true,
	isAnonymous: false,
	metadata: {},
	providerData: [],
	refreshToken: '',
	tenantId: null,
	delete: vi.fn(),
	getIdToken: vi.fn(),
	getIdTokenResult: vi.fn(),
	reload: vi.fn(),
	toJSON: vi.fn(),
	phoneNumber: '+1234567890',
	providerId: 'firebase',
};
