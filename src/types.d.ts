export type TProfile = {
	username: string;
	role: 'admin' | 'member';
	rating: number;
	created_dt: Date;
};
