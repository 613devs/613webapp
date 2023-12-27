import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import type { User } from 'firebase/auth';
import { mockUser } from '../../vitest-setup';
import type { Subscriber, Unsubscriber } from 'svelte/store';
import { userStore } from 'sveltefire';
import Navbar from '$lib/components/Navbar.svelte';

describe('Navbar.svelte', () => {
	afterEach(() => cleanup());

	it('should render logged in', () => {
		vi.mocked(userStore).mockReturnValue({
			subscribe: (run: Subscriber<User | null>): Unsubscriber => {
				run(mockUser);
				return () => {};
			},
		});
		const { container } = render(Navbar);
		expect(container).toMatchSnapshot();
	});

	it('should render logged out', () => {
		vi.mocked(userStore).mockReturnValue({
			subscribe: (run: Subscriber<User | null>): Unsubscriber => {
				run(null);
				return () => {};
			},
		});
		const { container } = render(Navbar);
		expect(container).toMatchSnapshot();
	});
});
