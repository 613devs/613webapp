export type TProfile = {
	uid: string;
	username: string;
	role: 'admin' | 'member';
	rating: number;
	created_dt: Date;
};
