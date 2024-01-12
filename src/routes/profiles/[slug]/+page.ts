export async function load({ params }: { params: { slug: string } }) {
	return {
		uid: params.slug,
	};
}
