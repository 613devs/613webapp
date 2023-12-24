export type TUser = {
	userNickname: string;
	userRole: 'admin' | 'member';
	userRating: number;
	userWins: number;
	userGames: number;
	userStreak: number;
};

export type TMatch = {
	matchDate: string;
	matchWinner: string;
	matchLoser: string;
	// rating after the game
	matchWinnerRating: number;
	matchLoserRating: number;
};

// export type TBlog = {
// 	blogTitle: string;
// 	blogContent: string;
// 	blogAuthor: string;
// 	blogDate: string;
// 	blogImage: string;
// };
