// DRAFT FOR TYPES

export type TBlog = {
	blogTitle: string;
	blogContent: string;
	blogAuthor: string;
	blogDate: string;
	blogImage: string;
};

export type TUser = {
	userNickname: string;
	userRole: 'admin' | 'member';
	userRating: number;
	// way to track game history so you can see % vs individual players
};
