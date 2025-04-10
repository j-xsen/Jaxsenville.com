import { supabase } from "../../../../../utils/supabase";

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const blogPosts = await supabase.from("Blahg").select("ID, url");
  const blogPostURLs = blogPosts.data?.map(
    (post) => `/blahg/${post.ID}/${post.url}`
  );
  return blogPostURLs;
}
