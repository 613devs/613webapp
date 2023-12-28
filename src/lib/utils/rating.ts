const EXPONENT_DENOMINATOR = 400;
const EXPONENT_BASE = 10;
const K_FACTOR = 32;

const calculateExpectedProbability = (ratingDifference: number) => {
	const exponent = ratingDifference / EXPONENT_DENOMINATOR;
	return 1 / (1 + Math.pow(EXPONENT_BASE, exponent));
};

const calculateMatchProbability = (playerARating: number, playerBRating: number) => {
	const ratingADifference = playerBRating - playerARating;
	const ratingBDifference = playerARating - playerBRating;

	const playerAExpectedProbability = calculateExpectedProbability(ratingADifference);
	const playerBExpectedProbability = calculateExpectedProbability(ratingBDifference);

	return [playerAExpectedProbability, playerBExpectedProbability];
};

const calculateNewRating = (rating: number, result: number, expectedProbability: number) => {
	const change = Math.round(K_FACTOR * (result - expectedProbability));
	const newRating = rating + change;
	return [newRating, change];
};

export const calculateNewRatings = (
	playerARating: number,
	playerBRating: number,
	playerAResult: number,
) => {
	const [playerAExpectedProbability, playerBExpectedProbability] = calculateMatchProbability(
		playerARating,
		playerBRating,
	);

	// playerAResult = 1 if playerA wins, 0 if playerB wins
	const playerBResult = 1 - playerAResult;

	const [playerANewRating, playerAChange] = calculateNewRating(
		playerARating,
		playerAResult,
		playerAExpectedProbability,
	);
	const [playerBNewRating, playerBChange] = calculateNewRating(
		playerBRating,
		playerBResult,
		playerBExpectedProbability,
	);

	return {
		playerANewRating,
		playerAChange,
		playerBNewRating,
		playerBChange,
	};
};
