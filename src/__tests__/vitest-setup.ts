import type { User } from 'firebase/auth';
import { vi } from 'vitest';
import type { TProfile } from '../types';
import MockDoc from './__mocks__/MockDoc.svelte';
import MockSignedIn from './__mocks__/MockSignedIn.svelte';
import MockSignedOut from './__mocks__/MockSignedOut.svelte';

export const mockState = {
	isUserSignedIn: true,
};

export const mockProfile: TProfile = {
	uid: '',
	username: 'test user',
	role: 'member',
	rating: 1000,
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

vi.mock('sveltefire', () => ({
	Doc: MockDoc,
	SignedIn: MockSignedIn,
	SignedOut: MockSignedOut,
}));
