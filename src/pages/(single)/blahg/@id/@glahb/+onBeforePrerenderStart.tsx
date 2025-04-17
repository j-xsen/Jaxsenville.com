import { supabase } from "../../../../../utils/supabase";

export { onBeforePrerenderStart };

interface PostListing {
  ID: number;
  url: string;
}

async function onBeforePrerenderStart() {
  const blogPosts = await supabase.from("Blahg").select("ID, url");
  const blogPostURLs = blogPosts.data?.map(
    (post: PostListing) => `/blahg/${post.ID}/${post.url}`
  );
  return blogPostURLs;
}
