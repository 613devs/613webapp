export type TProfile = {
	uid: string;
	username: string;
	role: 'admin' | 'member';
	rating: number;
	created_dt: Date;
};

export type TMatch = {
	match_dt: Date;
	winnerUID: string;
	loserUID: string;
	winnerRating: number;
	loserRating: number;
	winnerUsername: string;
	loserUsername: string;
};
