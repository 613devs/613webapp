import { calculateRatings } from '$lib/utils/rating';
import { expect, test } from 'vitest';

test('calculateNewRatings correctly calculates simple rating changes', () => {
	const winnerRating = 1000;
	const loserRating = 1000;

	const results = calculateRatings(winnerRating, loserRating);

	const winnerNewRating = 1016;
	const loserNewRating = 984;
	const change = 16;

	expect(results.winnerNewRating).toBe(winnerNewRating);
	expect(results.loserNewRating).toBe(loserNewRating);
	expect(results.change).toBe(change);
});

test('calculateNewRatings correctly calculates complex rating changes', () => {
	const winnerRating = 1078;
	const loserRating = 1231;

	const results = calculateRatings(winnerRating, loserRating);

	const winnerNewRating = 1101;
	const loserNewRating = 1208;
	const change = 23;

	expect(results.winnerNewRating).toBe(winnerNewRating);
	expect(results.loserNewRating).toBe(loserNewRating);
	expect(results.change).toBe(change);
});
