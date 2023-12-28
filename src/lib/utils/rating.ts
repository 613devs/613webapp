const EXPONENT_DENOMINATOR = 400;
const EXPONENT_BASE = 10;
const K_FACTOR = 32;

export const calculateNewRatings = (winnerRating: number, loserRating: number) => {
	const difference = Math.abs(winnerRating - loserRating);
	const expectedProbability = 1 / (1 + Math.pow(EXPONENT_BASE, difference / EXPONENT_DENOMINATOR));
	const newWinnerRating = winnerRating + Math.round(K_FACTOR * (1 - expectedProbability));
	const newLoserRating = loserRating - Math.round(K_FACTOR * (1 - expectedProbability));

	return {
		newWinnerRating,
		newLoserRating,
	};
};
