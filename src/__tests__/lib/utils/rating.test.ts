import { calculateNewRatings } from '$lib/utils/rating';
import { expect, test } from 'vitest';

test('calculateNewRatings correctly calculates simple rating changes', () => {
	const winnerRating = 1000;
	const loserRating = 1000;
	const result = calculateNewRatings(winnerRating, loserRating);

	expect(result.newWinnerRating).toBe(1016);
	expect(result.newLoserRating).toBe(984);
});

test('calculateNewRatings correctly calculates complex rating changes', () => {
	const winnerRating = 1078;
	const loserRating = 1231;
	const result = calculateNewRatings(winnerRating, loserRating);

	expect(result.newWinnerRating).toBe(1101);
	expect(result.newLoserRating).toBe(1208);
});
