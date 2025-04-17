import { supabase } from "../../../../utils/supabase";

export { onBeforePrerenderStart };

interface PostListing {
	url: string;
}

async function onBeforePrerenderStart() {
	const blogPosts = await supabase.from("Blahg").select("url");
	const blogPostURLs = blogPosts.data?.map(
		(post: PostListing) => `/blahg/${post.url}`
	);
	return blogPostURLs;
}
