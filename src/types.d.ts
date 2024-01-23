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
	winner2UID?: string;
	loserUID: string;
	loser2UID?: string;
	change: number;
	winnerUsername: string;
	winner2Username?: string;
	loserUsername: string;
	loser2Username?: string;
};
