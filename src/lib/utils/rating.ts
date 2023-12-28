// exponentDemoninator = 400
// exponentBase = 10
// kFactor = 32

// given rating difference, calculate expected win probability
const calculateExpectedProbability = (ratingDifference: number) => {
	const exponent = ratingDifference / 400;
	return 1 / (1 + Math.pow(10, exponent));
};

// given two player ratings, return expected win probabilities and rating differences
const calculateMatchProbability = (playerARating: number, playerBRating: number) => {
	const ratingADifference = playerBRating - playerARating;
	const ratingBDifference = playerARating - playerBRating;

	const playerAExpectedProbability = calculateExpectedProbability(ratingADifference);
	const playerBExpectedProbability = calculateExpectedProbability(ratingBDifference);

	return [playerAExpectedProbability, playerBExpectedProbability];
};

// given player rating, result, and expected win probability, return new rating and rating change
const calculateNewRating = (rating: number, result: number, expectedProbability: number) => {
	const change = Math.round(32 * (result - expectedProbability));
	const newRating = rating + change;
	return [newRating, change];
};

// given two player ratings and result, return new ratings and rating changes
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
