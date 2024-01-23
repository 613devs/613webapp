import { calculateRatingChange } from '$lib/utils/rating';
import { expect, test } from 'vitest';

test('calculateRatingChange', () => {
	expect(calculateRatingChange(1000, 1000)).toBe(50); // average
	expect(calculateRatingChange(0, 466)).toBe(75); // upper bound
	expect(calculateRatingChange(1000, 534)).toBe(25); // lower bound
	expect(calculateRatingChange(1000, 5)).toBe(5); // lose at 0 case
});
