import { calculateNewRatings } from '$lib/utils/rating';
import { expect, test } from 'vitest';

test('calculateNewRatings correctly calculates simple rating changes', () => {
	const playerARating = 1000;
	const playerBRating = 1000;
	const playerAResult = 1; // playerA wins

	const result = calculateNewRatings(playerARating, playerBRating, playerAResult);

	const expectedPlayerANewRating = 1016;
	const expectedPlayerAChange = 16;
	const expectedPlayerBNewRating = 984;
	const expectedPlayerBChange = -16;

	expect(result.playerANewRating).toBe(expectedPlayerANewRating);
	expect(result.playerAChange).toBe(expectedPlayerAChange);
	expect(result.playerBNewRating).toBe(expectedPlayerBNewRating);
	expect(result.playerBChange).toBe(expectedPlayerBChange);
});

test('calculateNewRatings correctly calculates complex rating changes', () => {
	const playerARating = 1231;
	const playerBRating = 1078;
	const playerAResult = 0; // playerB wins

	const result = calculateNewRatings(playerARating, playerBRating, playerAResult);

	const expectedPlayerANewRating = 1208;
	const expectedPlayerAChange = -23;
	const expectedPlayerBNewRating = 1101;
	const expectedPlayerBChange = 23;

	expect(result.playerANewRating).toBe(expectedPlayerANewRating);
	expect(result.playerAChange).toBe(expectedPlayerAChange);
	expect(result.playerBNewRating).toBe(expectedPlayerBNewRating);
	expect(result.playerBChange).toBe(expectedPlayerBChange);
});
