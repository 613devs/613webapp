import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import { mockState } from '../../vitest-setup';
import Navbar from '$lib/components/Navbar.svelte';

describe('Navbar.svelte', () => {
	it('should render logged in', () => {
		mockState.isUserSignedIn = true;
		const { container } = render(Navbar);
		expect(container).toMatchSnapshot();
	});

	it('should render logged out', () => {
		mockState.isUserSignedIn = false;
		const { container } = render(Navbar);
		expect(container).toMatchSnapshot();
	});
});
