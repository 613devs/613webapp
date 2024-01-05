const EXPONENT_DENOMINATOR = 400;
const EXPONENT_BASE = 10;
const K_FACTOR = 32;

export const calculateRatings = (winnerRating: number, loserRating: number) => {
	const winnerExpected =
		1 / (1 + Math.pow(EXPONENT_BASE, (loserRating - winnerRating) / EXPONENT_DENOMINATOR));
	const change = Math.round(K_FACTOR * (1 - winnerExpected));
	const winnerNewRating = winnerRating + change;
	const loserNewRating = loserRating - change;
	return {
		winnerNewRating,
		loserNewRating,
	};
};
