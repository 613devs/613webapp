const EXPONENT_DENOMINATOR = 1000;
const EXPONENT_BASE = 10;
const K_FACTOR = 100;
const UPPER_BOUND = K_FACTOR * 0.75;
const LOWER_BOUND = K_FACTOR * 0.25;

export const calculateRatingChange = (winnerRating: number, loserRating: number) => {
	const winnerExpected =
		1 / (1 + Math.pow(EXPONENT_BASE, (loserRating - winnerRating) / EXPONENT_DENOMINATOR));
	const change = Math.round(K_FACTOR * (1 - winnerExpected));

	if (loserRating - change < 0) return loserRating;
	if (change > UPPER_BOUND) return Math.round(UPPER_BOUND);
	if (change < LOWER_BOUND) return Math.round(LOWER_BOUND);
	return change;
};
